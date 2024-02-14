import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import Activities from "./Activities"

const TripDetails = () => {

    let navigate = useNavigate()

    let { id } = useParams();

    const [trip, setTrip] = useState('');

    const fetchTrip = async () => {
        let res = await Client.get(`/mytrips/${id}`)
        setTrip(res.data)
    }

    const deleteTrip = async () => {
        await Client.delete(`/mytrips/${id}`)
        navigate('/mytrips')
    }

    const editTrip = async (e) => {
        e.preventDefault()
        navigate(`/mytrips/${id}/edit`)
    }

    useEffect(() => {
        fetchTrip()
    }, [id])

    const viewDays = (dateString) => {
        navigate(`/mytrips/${id}/activities/${dateString}`);
    };

    const getDays = () => {
        const startDate = new Date(trip.startDate);
        const endDate = new Date(trip.endDate);
        const days = [];
        let d = 1
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dateString = currentDate.toISOString().split('T')[0]; // Get the date string in 'YYYY-MM-DD' format
            days.push(
                <div key={dateString} className="days">
                    <h3 className="day-title">Day {d}</h3>
                    <div className="dates" onClick={() => viewDays(dateString)}>
                        <div>
                            <p>{currentDate.toDateString()}</p>
                            <p className="trip-activity"><Activities id={id} date={dateString} showForm={false} /></p>
                        </div>
                        <i class="material-icons">arrow_forward</i>
                    </div>
                </div>
            );
            currentDate.setDate(currentDate.getDate() + 1);
            d = d + 1
        }
        return days;
    };

    return trip ? (
        <div>
            <section className="trip-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${trip.image})` }}>
                <div className="trip-hero-content">
                    <div>
                        <h1 className="trip-title">{trip.city}, {trip.country}</h1>
                        <h2>{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</h2>
                    </div>
                    <div className="btns">
                        <button className="trip-btn" onClick={editTrip}>edit</button>
                        <button className="trip-btn" onClick={deleteTrip}>delete</button>
                    </div>
                </div>
            </section>
            <section className="container">
                <div>
                    <h1>Itinerary</h1>
                    <br />
                    {getDays()}
                </div>
            </section>

        </div>
    ) : null
}

export default TripDetails