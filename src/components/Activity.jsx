import { useState, useEffect } from "react"
import Client from "../services/api"
import { useParams, useLocation } from "react-router-dom"

const Activity = ( { id: propId, date: propDate } ) => {

    const { id: paramsId, date: paramsDate } = useParams();
    const id = propId || paramsId;
    const date = propDate || paramsDate;

    const [activities, setActivities] = useState([])

    useEffect(() => {
        const getActivities = async () => {
            let res = await Client.get(`/mytrips/${id}/activities/${date}`)
            setActivities(res.data)
        }
        getActivities()
    }, [id, date])

    return (
        <ul>
        {activities.map((activity, index) => (
            <li key={activity._id}>
                {activity.link ? (
                    <a className="activity"  target="_blank" rel="noopener noreferrer" href={activity.link}>{activity.time} - {activity.activity}</a>
                ) : (
                    <span className="activity-no-link">{activity.time} - {activity.activity}</span>
                )}
                
            </li>
        ))}
    </ul>
    )
}

export default Activity