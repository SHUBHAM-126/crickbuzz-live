import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { format } from 'date-fns'

export default function Recent() {

    const [active, setActive] = useState('')

    const { data: recent, pending } = useFetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', 'recent')

    useEffect(() => {
        if (!pending) {
            setActive(recent.filters.matchType[0])
        }
    }, [recent])

    return (
        <div className=''>
            <div className='max-w-6xl mx-auto py-5 md:py-10'>
                <h2 className='text-2xl md:text-3xl font-medium mb-5'>Recent Matches</h2>
                {
                    pending && <p>Loading...</p>
                }

                <div className='flex align-middle gap-3 md:gap-6 mb-2 overflow-auto text-sm md:text-lg'>
                    {!pending &&
                        recent.filters.matchType.map((type) => {
                            return (
                                <h3 key={type}
                                    className={active == type ? 'active cursor-pointer' : 'cursor-pointer border border-slate-700/30 px-1 md:px-2 py-1 rounded-sm hover:text-sky-500'}
                                    onClick={() => setActive(type)}>
                                    {type}
                                </h3>
                            )
                        })}
                </div>
                {!pending &&

                    recent.typeMatches.map((type) => {
                        if (type.matchType == active) {
                            return (
                                <ul key={type.matchType} className='pt-2'>
                                    {type.seriesMatches.map((series) => {
                                        if (series.seriesAdWrapper) {
                                            return (
                                                <li key={series.seriesAdWrapper.seriesId} className="pb-4">
                                                    <h4 className='uppercase bg-slate-700 bg-opacity-20 p-2'>{series.seriesAdWrapper.seriesName}</h4>
                                                    <div className='divide-y divide-slate-700/60'>
                                                        {series.seriesAdWrapper.matches.map(match => (
                                                            <div key={match.matchInfo.matchId} className='py-3 text-sm'>
                                                                <p className='mb-1'>{match.matchInfo.team1.teamName} VS {match.matchInfo.team2.teamName}, <span className='text-xs text-slate-400'>{match.matchInfo.matchDesc}</span></p>
                                                                <p className='text-slate-400 text-xs mb-3'>{format(new Date(Number(match.matchInfo.startDate)), 'LLL dd • hh:mm b')} at {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}</p>
                                                                {match.matchScore ?
                                                                    <div className='space-y-2 border-l-4 border-slate-700/60 px-3 py-2'>
                                                                        <div className='flex gap-5'>
                                                                            <p className='w-10'>{match.matchInfo.team1.teamSName}</p>
                                                                            <p>
                                                                                {`${match.matchScore.team1Score.inngs1.runs} (${match.matchScore.team1Score.inngs1.overs} Overs)`}
                                                                            </p>
                                                                        </div>
                                                                        <div className='flex gap-5'>
                                                                            <p className='w-10'>{match.matchInfo.team2.teamSName}</p>
                                                                            <p>
                                                                                {`${match.matchScore.team2Score.inngs1.runs} (${match.matchScore.team2Score.inngs1.overs} Overs)`}
                                                                            </p>
                                                                        </div>
                                                                        <p className='text-blue-300'>{match.matchInfo.status}</p>
                                                                    </div> :
                                                                    <div className='border-l-4 border-slate-700/60 px-3 py-2'>
                                                                        <p className='text-red-300'>{`${match.matchInfo.status}`}</p>
                                                                    </div>
                                                                }
                                                                <div className='divide-x pt-4 divide-slate-700/70 text-sky-400 '>
                                                                    <a className='pl-0 pr-2 cursor-pointer hover:text-sky-600'>Live Score</a>
                                                                    <a className='px-2 cursor-pointer hover:text-sky-600'>Scorecard</a>
                                                                    <a className='pl-2 pr-0 cursor-pointer hover:text-sky-600'>Full Commentary</a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            )
                        }
                    })

                }

            </div>
        </div>
    )
}