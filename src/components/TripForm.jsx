import { useState, useEffect } from "react";
import Client from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"

const TripForm = () => {

    const navigate = useNavigate();

    let { id } = useParams()

    const user = localStorage.getItem('user') ? localStorage.getItem('user') : '';

    const [trip, setTrip] = useState({
        country: '',
        city: '',
        image: 'https://i.imgur.com/oyiaGIJ.jpeg',
        user: user,
        startDate: new Date(),
        endDate: new Date()
    });

    console.log(trip)

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "startDate" || name === "endDate") {
            // get users local time zone offset
            const timezoneOffset = new Date().getTimezoneOffset() * 600000 //convert minutes to milliseconds
             // Convert the input date string to a Date object in the user's local time zone
             const localDate = new Date(new Date(value) - timezoneOffset);
            setTrip({ ...trip, [name]: localDate })
        } else {
            setTrip({ ...trip, [name]: value })
        }
    }

    const addTrip = async () => {
        try {
            const response = await Client.post(`/mytrips`, trip);
            const tripId = response.data._id;
            navigate('/mytrips/');
        } catch (error) {
            console.error("Error adding trip:", error.response || error);
        }
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
            <input type="text" name="country" id="country" onChange={handleChange} />
            <br /><br />
            <label htmlFor="city">City</label>
            <input type="text" name="city" id="city" onChange={handleChange} />
            <br /><br />
            <label htmlFor="image">Image</label>
            <input type="text" name="image" id="image" onChange={handleChange} />
            <br /><br />
            <label htmlFor="startDate">Start Date</label>
            <input type="date" name="startDate" id="startDate" onChange={handleChange}/>
            <br /><br />
            <label htmlFor="endDate">End Date</label>
            <input type="date" name="endDate" id="endDate" onChange={handleChange}/>
            <br /><br />
            <button type="submit">Submit</button>
        </form>
    )
}

export default TripForm