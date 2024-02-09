import { useState, useEffect } from "react";
import Client from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const TripForm = () => {

    const navigate = useNavigate();
    let { id } = useParams()

    const [trip, setTrip] = useState({
        country: '',
        city: '',
        startDate: new Date(),
        endDate: new Date()
    });

    const handleChange = (e) => {
        setTrip({...trip, [e.target.name]: e.target.value})
    }

    const addTrip = async () => {
        const response = await Client.post(`/mytrips`, trip)
        const tripId = response.data._id
        navigate('/mytrips/')
    }

    const updateTrip = async () => {
        await Client.put(`/mytrips/${id}`, trip)
        navigate('/mytrips')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        id ? updateTrip(trip) : addTrip(trip)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="country">Country</label>
            <input type="text" name="country" id="country" onChange={handleChange}/>
            <br /><br />
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onChange={handleChange}/>
            <br /><br />
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" id="startDate" />
            <br /><br />
            <label htmlFor="endDate">End Date</label>
            <input type="date" name="endDate" id="endDate" />
            <br /><br />
            <button type="submt">Submit</button>
        </form>
    )
}

export default TripForm