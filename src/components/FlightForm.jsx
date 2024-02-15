import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import Client from "../services/api";

const FlightForm = () => {

    const navigate = useNavigate();

    let { id } = useParams()

    const [flight, setFlight] = useState({
        airline: '',
        flightNum: '',
        depCity: '',
        arrCity: '',
        date: new Date(),
        depTime: '',
        arrTime: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "Date") {
            // get users local time zone offset
            const timezoneOffset = new Date().getTimezoneOffset() * 600000 //convert minutes to milliseconds
            // Convert the input date string to a Date object in the user's local time zone
            const localDate = new Date(new Date(value) - timezoneOffset);
            setFlight({ ...flight, [name]: localDate })
        } else {
            setFlight({ ...flight, [name]: value })
        }
    }

    const addFlight = async () => {
        try {
            const response = await Client.post(`/mytrips/${id}/addflight`, flight);
            navigate(`/mytrips/${id}`);
        } catch (error) {
            console.error("Error adding flight:", error.response || error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addFlight()
    }

    return (
        <div className='signin-container'>
        <div>
            <h1>Add Flight</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <div><label htmlFor="airline">Airline:</label></div>
                    <br />
                    <input type="text" name="airline" id="airline" onChange={handleChange}/>
                </div>
                <br />
                <div>
                    <div><label htmlFor="flightNum">Your Flight Number:</label></div>
                    <br />
                    <input type="text" name="flightNum" id="flightNum" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <div><label htmlFor="depCity">Departing From:</label></div>
                    <br />
                    <input type="text" name="depCity" id="depCity" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <div><label htmlFor="arrCity">Arriving To:</label></div>
                    <br />
                    <input type="text" name="arrCity" id="arrCity" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <div><label htmlFor="date">Date:</label></div>
                    <br />
                    <input type="date" name="date" id="date" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <div><label htmlFor="depTime">Departure Time:</label></div>
                    <br />
                    <input type="time" name="depTime" id="depTime" onChange={handleChange} />
                </div>
                <br />
                <div>
                    <div><label htmlFor="arrTime">Arrival Time:</label></div>
                    <br />
                    <input type="time" name="arrTime" id="arrTime" onChange={handleChange} />
                </div>
                <br />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default FlightForm