import useFetch from "../../hooks/useFetch"

export default function LiveScore({ id }) {

  const { data: comm, pending: commPending } = useFetch(`https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/${id}/comm`, `${id}/comm`)

  return (
    <div>
      {commPending && <p>Loading...</p>}

      {!commPending &&
        <>
          <div className="mb-4 space-y-1">
            {comm.matchHeader.matchTeamInfo && comm.matchHeader.matchTeamInfo.map((team, index) => {
              if (index < 2) {
                const revInnings = [...comm.miniscore.matchScoreDetails.inningsScoreList].reverse()
                console.log(revInnings.length)
                return (
                  <h2 key={team.battingTeamId} className={`text-lg md:text-xl ${comm.miniscore.matchScoreDetails.highlightedTeamId === team.battingTeamId ? 'text-white' : 'text-slate-400'}`}>
                    <span className="mr-2 md:mr-3">{`${team.battingTeamShortName} `}</span>
                    
                    {revInnings.length !==0 && revInnings.map((innigs) => {
                      
                      if (innigs.batTeamId === team.battingTeamId) {
                        return <>
                          {innigs.inningsId > 2 && <span> & </span>}
                          <span key={innigs.inningsId} className='ml-0!important'>{`${innigs.score}/${innigs.wickets} (${Math.round(innigs.overs)}) `}</span>
                        </>
                      }
                    })}
                    {team.battingTeamId === comm.miniscore.batTeam.teamId &&
                      <>
                        <span className="text-sm ml-2 md:ml-3">{`CRR: ${comm.miniscore.currentRunRate}`}</span>
                        {comm.miniscore.requiredRunRate !== 0 && <span className="text-sm ml-2 md:ml-3">{` REQ: ${comm.miniscore.requiredRunRate}`}</span>}
                      </>
                    }
                  </h2>
                )
              }
            })}
          </div>

          <p className="text-sky-400 mb-2 text-sm md:text-base">{comm.matchHeader.status}</p>

          {/*Awards*/}
          {(comm.matchHeader.playersOfTheSeries.length !== 0 || comm.matchHeader.playersOfTheMatch.length !== 0) &&
            <div className="mb-6 text-xs font-light space-y-1 border-l-2 border-slate-700/60 pl-2 py-2">
              {comm.matchHeader.playersOfTheMatch.map((player) => (
                <p><span className="text-slate-300">Player of the match: </span>{`${player.fullName}`}</p>
              ))}
              {comm.matchHeader.playersOfTheSeries.map((player) => (
                <p><span className="text-slate-300">Player of the series: </span>{`${player.fullName}`}</p>
              ))}
            </div>
          }

          {/* Batter details */}
          <table className="table-styles table-fixed my-6">
            <thead>
              <tr className="bg-slate-700/20 font-light">
                <th className="font-light w-[35%]">Batter</th>
                <th className="font-light">R</th>
                <th className="font-light">B</th>
                <th className="font-light">4s</th>
                <th className="font-light">6s</th>
                <th className="font-light">SR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{comm.miniscore.batsmanStriker.batName}<span className="text-slate-400 text-xs align-top"> *</span></td>
                <td>{comm.miniscore.batsmanStriker.batRuns}</td>
                <td>{comm.miniscore.batsmanStriker.batBalls}</td>
                <td>{comm.miniscore.batsmanStriker.batFours}</td>
                <td>{comm.miniscore.batsmanStriker.batSixes}</td>
                <td>{parseFloat(comm.miniscore.batsmanStriker.batStrikeRate).toFixed(2)}</td>
              </tr>
              {comm.miniscore.batsmanNonStriker.batName !== "" &&
                <tr>
                  <td>{comm.miniscore.batsmanNonStriker.batName}</td>
                  <td>{comm.miniscore.batsmanNonStriker.batRuns}</td>
                  <td>{comm.miniscore.batsmanNonStriker.batBalls}</td>
                  <td>{comm.miniscore.batsmanNonStriker.batFours}</td>
                  <td>{comm.miniscore.batsmanNonStriker.batSixes}</td>
                  <td>{parseFloat(comm.miniscore.batsmanNonStriker.batStrikeRate).toFixed(2)}</td>
                </tr>
              }
            </tbody>
          </table>

          {/* Bowler details */}
          <table className="table-styles table-fixed mb-6">
            <thead>
              <tr className="bg-slate-700/20">
                <th className="font-light w-[35%]">Bowler</th>
                <th className="font-light">O</th>
                <th className="font-light">M</th>
                <th className="font-light">R</th>
                <th className="font-light">W</th>
                <th className="font-light">ECO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{comm.miniscore.bowlerStriker.bowlName}<span className="text-slate-400 text-xs align-top"> *</span></td>
                <td>{comm.miniscore.bowlerStriker.bowlOvs}</td>
                <td>{comm.miniscore.bowlerStriker.bowlMaidens}</td>
                <td>{comm.miniscore.bowlerStriker.bowlRuns}</td>
                <td>{comm.miniscore.bowlerStriker.bowlWkts}</td>
                <td>{parseFloat(comm.miniscore.bowlerStriker.bowlEcon).toFixed(2)}</td>
              </tr>
              <tr>
                <td>{comm.miniscore.bowlerNonStriker.bowlName}</td>
                <td>{comm.miniscore.bowlerNonStriker.bowlOvs}</td>
                <td>{comm.miniscore.bowlerNonStriker.bowlMaidens}</td>
                <td>{comm.miniscore.bowlerNonStriker.bowlRuns}</td>
                <td>{comm.miniscore.bowlerNonStriker.bowlWkts}</td>
                <td>{parseFloat(comm.miniscore.bowlerNonStriker.bowlEcon).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <p className="mb-6 text-sm md:text-base"><span className="text-slate-300">Recent: </span>{`${comm.miniscore.recentOvsStats}`}</p>

          <div className="mb-5">
            <p className="bg-slate-700/20 px-1 md:px-2 py-1 text-xs md:text-base">Key Stats</p>
            <div className="px-1 md:px-2 space-y-2 pt-2 text-xs md:text-sm font-light">
              {comm.miniscore.partnerShip && <p><span className="text-slate-300">Partnership: </span>{`${comm.miniscore.partnerShip.runs} (${comm.miniscore.partnerShip.balls})`}</p>}
              {comm.miniscore.lastWicket && <p><span className="text-slate-300">Last Wkt: </span>{`${comm.miniscore.lastWicket}`}</p>}
              {Object.keys(comm.miniscore.latestPerformance).length !== 0 &&
                <p>
                  <span className="text-slate-300">{`${comm.miniscore.latestPerformance[0].label}: `}</span>
                  {`${comm.miniscore.latestPerformance[0].runs} runs, ${comm.miniscore.latestPerformance[0].wkts} wkts`}
                </p>}
              <p><span className="text-slate-300">Toss: </span>{`${comm.miniscore.matchScoreDetails.tossResults.tossWinnerName} (${comm.miniscore.matchScoreDetails.tossResults.decision})`}</p>
            </div>
          </div>



        </>
      }
    </div>
  )
}