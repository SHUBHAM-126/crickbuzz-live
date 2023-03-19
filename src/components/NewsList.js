import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import { formatDistanceToNow } from "date-fns"

export default function NewsList() {

    const {data, pending} = useFetch('https://cricbuzz-cricket.p.rapidapi.com/news/v1/index', 'news')

    useEffect(()=>{
        console.log(data)
    },[pending])

    return (
        <div>
            <h2 className="text-xl mb-2">Latest News</h2>
            {!pending && 
                <ul className="text-sm divide-y divide-slate-700/70">
                    {data.storyList.map((story, index) => 
                        {
                            if (index < 5 && story.story){
                                return(
                                    <li key={story.story.id} className='py-3'> 
                                        <p className="text-xs text-slate-400 mb-1">{`${story.story.storyType} • ${story.story.context}`}</p>
                                        <p className="mb-2">{story.story.hline}</p>
                                        <p className="text-xs text-slate-300 mb-2">{story.story.intro}</p>
                                        <p className="text-xs text-slate-400">{formatDistanceToNow(new Date(Number(story.story.pubTime)), {addSuffix: true})}</p>
                                    </li>
                                )
                            }
                        }
                    )}
                </ul>
            }
        </div>
    )
}