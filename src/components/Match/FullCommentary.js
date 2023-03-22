import { useEffect } from "react";
import useFetch from "../../hooks/useFetch"
import reactStringReplace from "react-string-replace";

export default function FullCommentary({ id }) {

  const { data: comm, pending: commPending } = useFetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/comm`, `${id}/comm`)

  const Replacer = (str, repText, withText) => {
    for (let i = 0; i < repText.length; i++) {
      //str = str.replace(repText[i], withText[i])
      str = reactStringReplace(str, repText[i], (match) => (<b className="text-white font-semibold">{withText[i]}</b>))
    }
    str = reactStringReplace(str, '\\n', (match) => (<br />))
    return (<>{str}</>)
  }

  return (
    <div>
      {commPending && <p>Loading...</p>}

      {!commPending &&
        <>
          <ul className='space-y-6'>
            {comm.commentaryList.map(coms => (
              <li key={coms.timestamp} className='font-light text-slate-200 text-sm'>

                <div className='flex gap-1 md:gap-3 flex-col md:flex-row items-start'>
                  {coms.overNumber && <p className="w-10 float-left flex-shrink-0 bg-sky-400/10 text-center px-1 rounded-sm text-sky-400">{coms.overNumber}</p>}
                  {Object.keys(coms.commentaryFormats).length == 0 &&
                    <div>{coms.commText}</div>
                  }

                  {Object.keys(coms.commentaryFormats).length != 0 &&
                    <div>
                      {Replacer(coms.commText, coms.commentaryFormats.bold.formatId, coms.commentaryFormats.bold.formatValue)}
                    </div>
                  }
                </div>

                {coms.overSeparator &&
                  <div className="p-2 md:p-4 bg-slate-700/20 mt-5 text-xs grid grid-cols-2 md:flex gap-x-7 gap-y-5 md:gap-2 md:divide-x divide-slate-700/70 md:space-x-4">
                    <p className="text-xl col-span-full">{Math.ceil(coms.overSeparator.overNum)} <span className="md:hidden">Overs</span></p>
                    <div className="md:pl-4">
                      <p className="pb-1">{`Runs Scored: ${coms.overSeparator.runs}`}</p>
                      <p>{coms.overSeparator.o_summary}</p>
                    </div>
                    <div className="md:pl-4">
                      <p className="pb-1">{`Score after ${Math.ceil(coms.overSeparator.overNum)} overs`}</p>
                      <p>{`${coms.overSeparator.batTeamName} ${coms.overSeparator.score}-${coms.overSeparator.wickets}`}</p>
                    </div>
                    <div className="md:pl-4">
                      <p className="pb-1 flex gap-1 md:gap-2 md:justify-between">
                        <span>{coms.overSeparator.batStrikerNames[0]}</span>
                        <span>{`${coms.overSeparator.batStrikerRuns}(${coms.overSeparator.batStrikerBalls})`}</span>
                      </p>
                      <p className="flex gap-1 md:gap-2 md:justify-between">
                        <span>{coms.overSeparator.batNonStrikerNames[0]}</span>
                        <span>{`${coms.overSeparator.batNonStrikerRuns}(${coms.overSeparator.batNonStrikerBalls})`}</span>
                      </p>
                    </div>
                    <div className="md:pl-4">
                      <p className="pb-1"><span>{coms.overSeparator.bowlNames[0]}</span></p>
                      <p>{`${coms.overSeparator.bowlRuns}-${coms.overSeparator.bowlWickets} in ${coms.overSeparator.bowlOvers} Overs`}</p>
                    </div>
                  </div>
                }
              </li>
            ))}
          </ul>
          <a className="bg-slate-600 px-4 py-2 rounded-sm inline-flex items-center gap-1 hover:bg-slate-700 mb-5 md:mb-0 mt-10 cursor-not-allowed">
            Load More
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </>
      }
    </div>
  )
}