import { useEffect, useState } from "react"

export default function Image({path, local_name}) {

    const [pending, setPending] = useState(true)
    const [data, setData] = useState([])


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b87670a014mshde7d54c98d987d6p115316jsn1307cbbb39da',
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    useEffect(() => {
        console.log(data)
        const check = localStorage.getItem(local_name);
        if (check) {
            setData(JSON.parse(check))
            setPending(false)
        }
        fetch(path, options)
            .then(response => response.json())
            .then(response => {
                setData(response)
                setPending(false)
                localStorage.setItem(local_name, JSON.stringify(response))
            })
            .catch(err => console.error(err));
    }, [])

    return (
        <img src="" />
    )
}