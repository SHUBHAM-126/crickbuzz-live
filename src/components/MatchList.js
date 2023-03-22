import { format } from 'date-fns'
import {Link} from 'react-router-dom'

export default function MatchList({ data, active, upcoming = false }) {
    return (
        <>
            {data.typeMatches.map((type) => {
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
                                                        <p className={`text-slate-400 text-xs ${!upcoming && 'mb-3'}`}>{format(new Date(Number(match.matchInfo.startDate)), 'LLL dd • hh:mm b')} at {match.matchInfo.venueInfo.ground}, {match.matchInfo.venueInfo.city}</p>
                                                        {match.matchScore &&
                                                            <div className='space-y-2 border-l-4 border-slate-700/60 px-3 py-2'>
                                                                <div className='flex gap-5'>
                                                                    <p className='w-10'>{match.matchInfo.team1.teamSName}</p>
                                                                    <p>
                                                                        {Object.keys(match.matchScore.team1Score).length != 0 && `${match.matchScore.team1Score.inngs1.runs} (${match.matchScore.team1Score.inngs1.overs} Overs)`}
                                                                    </p>
                                                                </div>
                                                                <div className='flex gap-5'>
                                                                    <p className='w-10'>{match.matchInfo.team2.teamSName}</p>
                                                                    <p>
                                                                        {Object.keys(match.matchScore.team2Score).length != 0 && `${match.matchScore.team2Score.inngs1.runs} (${match.matchScore.team2Score.inngs1.overs} Overs)`}
                                                                    </p>
                                                                </div>
                                                                <p className='text-blue-300'>{match.matchInfo.status}</p>
                                                            </div>
                                                        }

                                                        {(!match.matchScore && !upcoming) &&
                                                            <div className='border-l-4 border-slate-700/60 px-3 py-2'>
                                                                <p className='text-red-300'>{`${match.matchInfo.status}`}</p>
                                                            </div>
                                                        }

                                                        {!upcoming && <div className='divide-x pt-4 divide-slate-700/70 text-sky-400 '>
                                                            <Link to={`/match/${match.matchInfo.matchId}`} className='pl-0 pr-2 cursor-pointer hover:text-sky-600'>Live Score</Link>
                                                            <Link to={`/match/${match.matchInfo.matchId}?selected=scorecard`} className='px-2 cursor-pointer hover:text-sky-600'>Scorecard</Link>
                                                            <Link to={`/match/${match.matchInfo.matchId}?selected=full-commentary`} className='pl-2 pr-0 cursor-pointer hover:text-sky-600'>Full Commentary</Link>
                                                        </div>}
                                            
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
            })}
        </>
    )
}