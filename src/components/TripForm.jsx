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
        <div className='signin-container'>
            <div>
                <h1>{id ? "Edit Trip" : "Add New Trip"}</h1>
                <br />
                <br />
                <form onSubmit={handleSubmit}>
                    <div>
                        <div><label htmlFor="country">Country:</label></div>
                        <br />
                        <input type="text" name="country" id="country" onChange={handleChange}/>
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="city">City:</label></div>
                        <br />
                        <input type="text" name="city" id="city" onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="image">Add Image URL:</label></div>
                        <br />
                        <input type="text" name="image" id="image" onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="startDate">Start Date:</label></div>
                        <br />
                        <input type="date" name="startDate" id="startDate" onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="endDate">End Date:</label></div>
                        <br />
                        <input type="date" name="endDate" id="endDate" onChange={handleChange} />
                    </div>
                    <br />
                    <br />
                    <button className="form-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default TripForm