import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Client from "../services/api"

const PlaceDetails = () => {

    let { id } = useParams()
     
    const [place, setPlace] = useState([])

    const fetchPlace = async () => {
        let res = await Client.get(`/explore/${id}`)
        setPlace(res.data)
    }

    useEffect(() => {
        fetchPlace()
    }, [id])

    return (
        <div className="container">
            <img className="place-img" src={place.image} alt={place.country}/>
            <h1>{place.city} {place.country}</h1>
            <p>{place.description}</p>
        </div>
    )
}

export default PlaceDetails