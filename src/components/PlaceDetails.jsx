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
            <div className="place-details-container">
                <h1 className="place-title">{place.city} {place.country} Travel Guide</h1>
                <img className="place-img" src={place.image} alt={place.country} />
                <p>{place.description}</p>
            </div>
        </div>
    )
}

export default PlaceDetails