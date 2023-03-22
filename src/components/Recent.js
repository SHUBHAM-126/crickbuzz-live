import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import MatchList from './MatchList'

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
                                    className={active == type ? 'active_tab cursor-pointer' : 'cursor-pointer border border-slate-700/30 px-1 md:px-2 py-1 rounded-sm hover:text-sky-500'}
                                    onClick={() => setActive(type)}>
                                    {type}
                                </h3>
                            )
                        })}
                </div>
                {!pending && <MatchList data={recent} active={active}/>}

            </div>
        </div>
    )
}