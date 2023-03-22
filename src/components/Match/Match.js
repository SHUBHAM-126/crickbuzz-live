import { useParams, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch"
import format from "date-fns/format"
import ScoreCard from "./ScoreCard"
import FullCommentary from "./FullCommentary"
import LiveScore from "./LiveScore"

export default function Match() {

    const params = useParams()
    const [selected] = useSearchParams()

    const matchId = params.id

    const [active, setActive] = useState('livescore')

    const { data: info, pending: infoPending } = useFetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${matchId}`, matchId)

    useEffect(() => {
        console.log("MatchID:" + matchId)

        if (selected.get('selected') != null) {
            setActive(selected.get('selected'))
        }

    }, [infoPending])

    return (
        <div className="py-5 md:py-10">
            {/* Match details */}
            {infoPending && <p>Loading match details...</p>}
            {!infoPending &&
                <div>
                    <h1 className='text-2xl mb-5'>
                        {`${info.matchInfo.team1.name} VS ${info.matchInfo.team2.name},`}
                        <span className='text-slate-400'> {info.matchInfo.matchDescription}</span>
                    </h1>
                    <p className='mb-1 text-slate-200'>{`${info.matchInfo.series.name}`}</p>
                    <div className='text-xs font-light text-slate-200 flex flex-col md:flex-row gap-0 md:gap-8'>
                        <p>{`Venue: ${format(new Date(info.matchInfo.matchStartTimestamp), 'p O, PP')}`}</p>
                        <p>{`Date & Time: ${info.matchInfo.venue.name}, ${info.matchInfo.venue.city}`}</p>
                    </div>

                    {/* Tabs */}
                    <div className="pt-10">
                        <ul className="flex align-middle gap-3 md:gap-6 mb-5 overflow-auto text-sm md:text-lg pb-6 border-b border-b-slate-700/30">
                            <li
                                className={active == 'livescore' ? 'active_tab' : 'inactive_tab'}
                                onClick={() => setActive('livescore')}
                            >
                                Live Score
                            </li>
                            <li
                                className={active == 'scorecard' ? 'active_tab' : 'inactive_tab'}
                                onClick={() => setActive('scorecard')}
                            >
                                Scorecard
                            </li>
                            <li
                                className={active == 'full-commentary' ? 'active_tab' : 'inactive_tab'}
                                onClick={() => setActive('full-commentary')}
                            >
                                Commentary
                            </li>
                        </ul>
                        {(active != 'scorecard' && active != 'full-commentary') && <LiveScore />}
                        {active == 'scorecard' && <ScoreCard />}
                        {active == 'full-commentary' && <FullCommentary id= {matchId}/>}
                    </div>

                </div>}
        </div>
    )
}