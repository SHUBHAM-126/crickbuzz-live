import { useState, useEffect } from "react";

export default function useFetch(path, local_name) {

    const [data, setData] = useState([])
    const [pending, setPending] = useState(true)
    const [isError, SetIsError] = useState(false)

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const check = localStorage.getItem(local_name);
        if (check) {
            setData(JSON.parse(check));
            setPending(false)
            SetIsError(false)
        }
        else {
            fetch(path, options)
                .then(res => res.json())
                .then(res => {
                    if (res.message == "You have exceeded the DAILY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/cricketapilive/api/cricbuzz-cricket") {
                        throw "Exceeded daily quota"
                    }
                    else if (res.message){
                        throw "Error while fetching"
                    }
                    else {
                        setData(res)
                        setPending(false)
                        console.log('Fetched from API')
                        localStorage.setItem(local_name, JSON.stringify(res))
                        SetIsError(false)
                    }
                })
                .catch(err => {
                    console.log(err)
                    SetIsError(true)
                })
        }
    }, [path, local_name])

    return { data, pending, isError }
}