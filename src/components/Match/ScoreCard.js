import useFetch from "../../hooks/useFetch"
import format from "date-fns/format"

export default function ScoreCard({ id }) {

  const { data: score, pending } = useFetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/scard`, `${id}/scard`)

  const sortObjects = (obj) => {
    const unSorted = [...Object.entries(obj)]
    const sorted = unSorted.sort(([key1, value1], [key2, value2]) => {
      const key_1 = key1.split('_')
      const key_2 = key2.split('_')

      if (Number(key_1[1]) > Number(key_2[1])) {
        return 1
      }
      if (Number(key_1[1]) < Number(key_2[1])) {
        return -1
      }
      return 0
    })

    const sortedArr = []
    sorted.forEach(([key, value]) => sortedArr.push(value))

    return sortedArr
  }

  return (
    <div className="pb-5">
      {pending && <p>Loading...</p>}
      {!pending &&
        <>
          <p className="text-sky-400 mb-6">{score.status}</p>

          {score.scoreCard.length !== 0 &&
            <div>
              {score.scoreCard.map(inning => (
                <div key={inning.inningsId} className="mb-12">
                  <div className="flex bg-slate-700/70 py-3 px-2 justify-between gap-4">
                    <p>{`${inning.batTeamDetails.batTeamName} Innings`}</p>
                    <p>{`${inning.scoreDetails.runs}-${inning.scoreDetails.wickets} (${inning.scoreDetails.overs})`}</p>
                  </div>
                  <table className="table-fixed w-full score-table table-styles mb-6 overflow-auto block whitespace-nowrap md:table">
                    <thead>
                      <tr className="bg-slate-700/30 text-xs md:text-sm">
                        <th className="font-light w-[20%] sticky left-0">Batter</th>
                        <th className="font-light w-[35%]"></th>
                        <th className="font-light">R</th>
                        <th className="font-light">B</th>
                        <th className="font-light">4s</th>
                        <th className="font-light">6s</th>
                        <th className="font-light">SR</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs divide-y divide-slate-700/50">
                      {sortObjects(inning.batTeamDetails.batsmenData).map(batter => (
                        <tr key={batter.batId}>
                          <td className="sticky left-0 max-md:bg-slate-800">{batter.batName}
                            <>{batter.isCaptain && <span> (c) </span>}</>
                            <>{batter.isKeeper && <span> (wk)</span>}</>
                          </td>
                          <td>{batter.outDesc}</td>
                          <td>{batter.runs}</td>
                          <td>{batter.balls}</td>
                          <td>{batter.fours}</td>
                          <td>{batter.sixes}</td>
                          <td>{parseFloat(batter.strikeRate).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="text-sm">
                        <td className="text-sky-400 sticky left-0">Extras</td>
                        <td colSpan='6' className="text-right">
                          <span>{`${inning.extrasData.total}`} </span>
                          <span className="text-slate-300">{`(b ${inning.extrasData.byes}, lb ${inning.extrasData.legByes}, w ${inning.extrasData.wides}, nb ${inning.extrasData.noBalls}, p ${inning.extrasData.penalty})`}</span>
                        </td>
                      </tr>
                      <tr className="text-sm">
                        <td className="text-sky-400 sticky left-0">Total</td>
                        <td colSpan='6' className="text-right">
                          <span>{`${inning.scoreDetails.runs}`} </span>
                          <span className="text-slate-300">{`(${inning.scoreDetails.wickets} wkts, ${inning.scoreDetails.overs} Ovs)`}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {inning.wicketsData &&
                    <div>
                      <p className="bg-slate-700/30 text-sm px-2 py-1">Fall of wickets</p>
                      <p className="px-2 py-1 text-xs leading-relaxed font-light">
                        {
                          sortObjects(inning.wicketsData).map((wkt) => (
                            <span key={wkt.batId}>{`${wkt.batName}-${wkt.wktNbr} (${wkt.batName}, ${wkt.wktOver}) • `}</span>
                          ))
                        }
                      </p>
                    </div>
                  }

                  {inning.bowlTeamDetails &&
                    <table className="mt-6 table-styles table-fixed">
                      <thead>
                        <tr className="bg-slate-700/30 text-xs md:text-sm">
                          <th className="font-light w-24 md:w-[20%]">Bowler</th>
                          <th className="font-light">O</th>
                          <th className="font-light">M</th>
                          <th className="font-light">R</th>
                          <th className="font-light">W</th>
                          <th className="font-light">NB</th>
                          <th className="font-light">WD</th>
                          <th className="font-light">ECO</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-slate-700/50">
                        {sortObjects(inning.bowlTeamDetails.bowlersData).map(bowler => (
                          <tr key={bowler.bowlerId}>
                            <td>{bowler.bowlName}
                              <>{bowler.isCaptain && <span> (c) </span>}</>
                            </td>
                            <td>{bowler.overs}</td>
                            <td>{bowler.maidens}</td>
                            <td>{bowler.runs}</td>
                            <td>{bowler.wickets}</td>
                            <td>{bowler.no_balls}</td>
                            <td>{bowler.wides}</td>
                            <td>{parseFloat(bowler.economy).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }

                  {inning.ppData &&
                    <table className="mt-6 table-styles table-fixed">
                      <thead>
                        <tr className="bg-slate-700/30 text-sm">
                          <th className="font-light">Powerplays</th>
                          <th className="font-light text-center">Overs</th>
                          <th className="font-light text-right">Runs</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs divide-y divide-slate-700/50">
                        {sortObjects(inning.ppData).map(pp => (
                          <tr key={pp.ppId}>
                            <td>{pp.ppType}</td>
                            <td className="text-center">{`${pp.ppOversFrom} - ${pp.ppOversTo}`}</td>
                            <td className="text-right">{pp.runsScored}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </div>
              ))}

              {/* Match info */}
              <div>
                <p className="bg-slate-700/70 py-3 px-2">Match Info</p>
                <table className="table-fixed w-full table-styles">
                  <tbody className="text-xs md:text-sm divide-y divide-slate-700/50">
                    <tr>
                      <td className="w-[25%]">Match</td>
                      <td>{`${score.matchHeader.team1.shortName} vs ${score.matchHeader.team2.shortName}, ${score.matchHeader.matchDescription}, ${score.matchHeader.seriesDesc}`}</td>
                    </tr>
                    <tr>
                      <td className="w-[25%]">Date</td>
                      <td>{format(new Date(score.matchHeader.matchStartTimestamp), 'PPPP')}</td>
                    </tr>
                    <tr>
                      <td className="w-[25%]">Toss</td>
                      <td>{`${score.matchHeader.tossResults.tossWinnerName} won the toss and opt for ${score.matchHeader.tossResults.decision}`}</td>
                    </tr>
                    <tr>
                      <td className="w-[25%]">Time</td>
                      <td>{format(new Date(score.matchHeader.matchStartTimestamp), 'p')}</td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          }
        </>
      }
    </div>
  )
}