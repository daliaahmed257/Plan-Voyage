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

    return (
        <div>
            <h2>Activities</h2>
            <button>Add Activity</button>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index}>
                        {activity.activity} - {activity.time}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Activities