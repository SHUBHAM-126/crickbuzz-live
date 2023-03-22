import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import MatchList from './MatchList'

export default function Upcoming() {
  const [active, setActive] = useState('')

  const { data: live, pending } = useFetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming', 'upcoming')

  useEffect(() => {
    if (!pending) {
      setActive(live.typeMatches[0].matchType)
    }
  }, [live])

  return (
    <div className=''>
      <div className='max-w-6xl mx-auto py-5 md:py-10'>
        <h2 className='text-2xl md:text-3xl font-medium mb-5'>Upcoming Matches</h2>
        {
          pending && <p>Loading...</p>
        }

        <div className='flex align-middle gap-3 md:gap-6 mb-2 overflow-auto text-sm md:text-lg'>
          {!pending &&
            live.typeMatches.map((type) => {
              return (
                <h3 key={type.matchType}
                  className={active == type.matchType ? 'active_tab cursor-pointer' : 'cursor-pointer border border-slate-700/30 px-1 md:px-2 py-1 rounded-sm hover:text-sky-500'}
                  onClick={() => setActive(type.matchType)}>
                  {type.matchType}
                </h3>
              )
            })}
        </div>
        {!pending && <MatchList data={live} active={active} upcoming ={true} />}

      </div>
    </div>
  )
}