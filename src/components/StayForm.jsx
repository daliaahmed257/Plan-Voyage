import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom"
import Client from "../services/api";

const StayForm = () => {

    const navigate = useNavigate();

    let { id } = useParams()

    const [stay, setStay] = useState({
        name: '',
        link: '',
        startDate: new Date(),
        endDate: new Date()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "startDate" || name === "endDate") {
            // get users local time zone offset
            const timezoneOffset = new Date().getTimezoneOffset() * 600000 //convert minutes to milliseconds
            // Convert the input date string to a Date object in the user's local time zone
            const localDate = new Date(new Date(value) - timezoneOffset);
            setStay({ ...stay, [name]: localDate })
        } else {
            setStay({ ...stay, [name]: value })
        }
    }

    const addStay = async () => {
        try {
            const response = await Client.post(`/mytrips/${id}/addstay`, stay);
            navigate(`/mytrips/${id}`);
        } catch (error) {
            console.error("Error adding stay:", error.response || error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addStay()
    }

    return (
        <div className='signin-container'>
        <div>
            <h1>Add Accomodation</h1>
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <div><label htmlFor="name">Name:</label></div>
                    <br />
                    <input type="text" name="name" id="name" onChange={handleChange}/>
                </div>
                <br />
                <div>
                    <div><label htmlFor="link">Link:</label></div>
                    <br />
                    <input type="text" name="link" id="link" onChange={handleChange} />
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
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default StayForm