import { useState, useEffect } from "react";

export default function useFetch(path, local_name) {

    const [data, setData] = useState([])
    const [pending, setPending] = useState(true)

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b87670a014mshde7d54c98d987d6p115316jsn1307cbbb39da',
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
                    setData(res)
                    setPending(false)
                    console.log('Fetched from API')
                    localStorage.setItem(local_name, JSON.stringify(res))
                })
                .catch(err => console.log(err))
        }
    }, [path, local_name])

    return {data, pending}
}