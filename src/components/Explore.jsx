import { useEffect, useState } from "react"
import Client from "../services/api"
import { Link } from "react-router-dom"
import Hero from "./Hero"

const Explore = ({ user }) => {

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
            <Hero />
            <div className="container">
                <div>
                    <h1>Explore New Places to Visit</h1>
                    <br />
                    <div className="cards-grid">
                        <div className="card">
                            {places.map(place => (
                                <Link to={`/explore/${place._id}`}>
                                    <div key={place._id}>
                                        <div className="img-container"><img className="card-img" src={place.image} alt={place.country} /></div>
                                        <h3>{place.country}</h3>
                                        <p>{place.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore