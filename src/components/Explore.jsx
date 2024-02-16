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
            <br />
            <div className="container">
                <div>
                    <h2 className="page-title">Explore New Places to Visit</h2>
                    <br />
                    <br />
                    <div className="cards-grid">
                        {places.map(place => (
                            <div className="card" key={place._id}>
                                <Link to={`/explore/${place._id}`}>
                                    <div key={place._id}>
                                        <div className="img-container"><img className="card-img" src={place.image} alt={place.country} /></div>
                                        <p className="card-title">{place.country}</p>
                                        <p className="card-subtitle">{place.description}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore