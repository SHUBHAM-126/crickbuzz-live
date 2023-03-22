import { useState, useEffect } from "react";

export default function useFetch(path, local_name) {

    const [data, setData] = useState([])
    const [pending, setPending] = useState(true)

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
        }
        else {
            fetch(path, options)
                .then(res => res.json())
                .then(res => {
                    if (res.message == "Too many requests") {
                        throw "Too many requests"
                    }
                    else {
                        setData(res)
                        setPending(false)
                        console.log('Fetched from API')
                        localStorage.setItem(local_name, JSON.stringify(res))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [path, local_name])

    return { data, pending }
}