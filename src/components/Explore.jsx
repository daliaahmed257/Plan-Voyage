import { useEffect, useState } from "react"
import Client from "../services/api"

const Explore = () => {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        const getPlaces = async () => {
            let res = await Client.get('/explore')
            setPlaces(res.data)
        }
        getPlaces()
    }, [])

    return (
        <div>
            <h1>Explore Places</h1>
            {places.map(place => (
                <div key={place._id}>
                    <h3>{place.country}</h3>
                </div>
            ))}
        </div>
    )
}

export default Explore