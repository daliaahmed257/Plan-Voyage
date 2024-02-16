import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Client from "../services/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import Activity from "./Activity"

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
                    {d > 0 ? (
                        <div className="day-title">
                            <h3 id="day">Day</h3>
                            <h1>0{d}</h1>
                        </div>
                    ) : (
                        <div className="day-title" Í>
                            <h3 className="day-title">Day</h3>
                            <h1>0{d}</h1>
                        </div>
                    )}

                    <div className="dates">
                        <div>
                            <p>{currentDate.toDateString()}</p>
                            <p className="trip-activity"><Activity id={id} date={dateString} showForm={false} /></p>
                        </div>
                        <div className="add-activity-btn" onClick={() => viewDays(dateString)}>
                            <i class="material-icons" style={{ color: "#304D56", cursor: "pointer", padding: "16px" }}>add</i>
                        </div>

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
            <section className="trip-hero" style={{ backgroundImage: `  linear-gradient(rgba(14, 50, 54, 0.60), rgba(14, 50, 54, 0.60)), url(${trip.image})` }}>
                <div className="trip-hero-content">
                    <div>
                        <h1 className="trip-title">{trip.city}, {trip.country}</h1>
                        <p className="trip-subtitle">{new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                    </div>
                    <div className="btns">
                        <button className="trip-btn" onClick={editTrip}>edit</button>
                        <button className="trip-btn" onClick={deleteTrip}>delete</button>
                    </div>
                </div>
            </section>
            <br />

            <section className="container trip-details-content">

                <div className='stay-flight-container'>
                    <h1>Bookings</h1>
                    <br />
                    {trip.stay.length > 0 ? (
                        <div>
                            <div className="added-card">
                                {trip.stay.map(s => (
                                    <div className="stay-added">
                                        <Link to={s.link} target="_blank" rel="noopener noreferrer" >
                                            <p>Accomodations</p>
                                            <div className="title-link">
                                                <h1>{s.name}</h1>
                                                <i class="material-icons" style={{ fontSize: '24px' }}>open_in_new</i>
                                            </div>
                                            <p>{new Date(s.startDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} - {new Date(s.endDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <a className="add-another" onClick={stayForm}>+ Add another accommodation</a >
                        </div>
                    ) : (<button className="no-booking no-stay-btn" onClick={stayForm}>+ Add Accomodations</button>)}
                    <br />

                    {trip.flights.length > 0 ? (
                        <div>
                            <div className="added-card added-flight-card">
                                {trip.flights.map(flight => (
                                    <div className="stay-added">
                                        <p>Flight</p>
                                        <div className="flight-card-title">
                                            <h3>{flight.depCity}</h3>
                                            <i class="material-icons" style={{ fontSize: '24px' }}>arrow_forward</i>
                                            <h3>{flight.arrCity}</h3>
                                        </div>
                                        <p >{new Date(flight.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} : {flight.depTime} - {flight.arrTime}</p>
                                        <p className="card-subtitle" id="airline">{flight.airline} {flight.flightNum}</p>

                                    </div>
                                ))}
                            </div>
                            <a className="add-another" onClick={flightForm}>+ Add another flight</a>
                        </div>
                    ) : (<button className="no-booking" onClick={flightForm}>+ Add Flight</button>)}
                </div>

                <div className="get-days-container">
                    <h1>Itinerary</h1>
                    <br />
                    {getDays()}
                </div>
            </section>

        </div>
    ) : null
}

export default TripDetails