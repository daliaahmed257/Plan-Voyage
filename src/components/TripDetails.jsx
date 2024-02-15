import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import Activities from "./Activities"
import { Link } from "react-router-dom"

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

    const stayForm = () => {
        navigate(`/mytrips/${id}/addstay`)
    }

    const flightForm = () => {
        navigate(`/mytrips/${id}/addflight`)
    }

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
                <div className='stay-flight-container'>
                    {trip.stay.length > 0 ? (
                        <div>
                            <div>
                                {trip.stay.map(s => (
                                    <div className="stay-added">
                                        <p>Accomodations</p>
                                        <Link to={s.link} target="_blank" rel="noopener noreferrer" className="title-link">
                                            <h1>{s.name}</h1>
                                            <i class="material-icons" style={{ fontSize: '24px' }}>open_in_new</i>
                                        </Link>
                                        <p>{new Date(s.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(s.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>

                                    </div>
                                ))}
                            </div>
                            <a onClick={stayForm}>+ add another accommodation</a>
                        </div>
                    ) : (<button onClick={stayForm}>Add Accomodations</button>)}
                    <br />
                    {trip.flights.length > 0 ? (
                        <div>
                            <div>
                                {trip.flights.map(flight => (
                                    <div className="stay-added">
                                        <p>Flight</p>
                                        <h3>{flight.depCity}
                                            <span class="material-symbols-outlined">arrow_forward</span>
                                            {flight.arrCity}
                                        </h3>
                                        <p>{flight.date},{flight.depTime} - {flight.arrTime}</p>
                                        <p>{flight.airline} {flight.flightNum}</p>

                                    </div>
                                ))}
                            </div>
                            <a onClick={flightForm}>+ add another flight</a>
                        </div>
                    ) : (<button onClick={flightForm}>Add Flight</button>)}
                </div>
                <br />
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