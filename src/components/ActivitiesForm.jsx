import { useState, useEffect } from "react"
import Client from "../services/api"
import { useParams, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const ActivitiesForm = () => {

    const navigate = useNavigate()

    const { id, date } = useParams();

    const [activities, setActivities] = useState([])

    const [activity, setActivity] = useState({
        activity: '',
        link: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value })
    }

    const addActivity = async () => {
        try {
            await Client.post(`/mytrips/${id}/activities/${date}`, activity);
            setActivities([...activities, activity])
            navigate(`/mytrips/${id}`);
        } catch (error) {
            console.error("Error adding activity:", error.response || error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(activity)
        addActivity()
    }

    return (

        <div className='form-container'>
            <div className="form-background">
                <h2>Activities for {new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</h2>
                <br />
                <br />
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <div><label htmlFor="activity">Activity</label></div>
                        <br />
                        <input type="text" name="activity" id="activity" onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="link">Add Link</label></div>
                        <br />
                        <input type="text" name="link" id="link" onChange={handleChange} />
                    </div>
                    <br />
                    <div>
                        <div><label htmlFor="time">Start Date</label></div>
                        <br />
                        <input type="time" name="time" id="time" onChange={handleChange} />
                    </div>
                    <br /><br />
                    <button className="form-btn" type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ActivitiesForm