import { useState, useEffect } from "react"
import Client from "../services/api"
import { useParams } from "react-router-dom"

const Activities = () => {

    const { id, date } = useParams()

    const [activities, setActivities] = useState([])

    useEffect(() => {
        const getActivities = async () => {
            console.log("activities for trip:", id, "on date:", date)
            let res = await Client.get(`/mytrips/${id}/activities/${date}`)
            setActivities(res.data)
            console.log("Activities fetched:", res.data)
        }
        getActivities()
    }, [id, date])

    const [activity, setActivity] = useState({
        activity: '',
        link: '',
        time: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActivity({ ...activity, [name]: value })
        console.log(activity)
    }

    const addActivity = async () => {
        try {
            await Client.post(`/mytrips/${id}/activities/${date}`, activity);
        } catch (error) {
            console.error("Error adding activity:", error.response || error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(activity)
        addActivity()
    }

    return (
        <div>
            <h2>Activities for {date}</h2>
            <form onSubmit={handleSubmit} method="POST">
                <label htmlFor="activity">Activity</label>
                <input type="text" name="activity" id="activity" onChange={handleChange}/>
                <br /><br />
                <label htmlFor="link">Add Link</label>
                <input type="text" name="link" id="link" onChange={handleChange}/>
                <br /><br />
                <label htmlFor="time">Start Date</label>
                <input type="time" name="time" id="time" onChange={handleChange}/>
                <br /><br />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>
                        {activity.time} - {activity.activity} {activity.link ? <a href={activity.link}>Link</a> : null }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Activities