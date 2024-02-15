import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Explore from './components/Explore'
import MyTrips from './components/MyTrips'
import SignIn from './components/SignIn'
import Register from './components/Register'
import TripForm from './components/TripForm'
import TripDetails from './components/TripDetails'
import { CheckSession } from './services/Auth'
import { useEffect, useState } from 'react'
import Activities from './components/Activities'
import StayForm from './components/StayForm'
import FlightForm from './components/FlightForm'
import PlaceDetails from './components/PlaceDetails'

function App() {

  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Header
        user={user}
        handleLogOut={handleLogOut} 
      />
        <Routes className="main">
          <Route path='/' element={<Explore user={user}/>} />
          <Route path='mytrips' element={<MyTrips user={user}/>} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path='/mytrips/addtrip' element={<TripForm />} />
          <Route path='/mytrips/:id' element={<TripDetails />} />
          <Route path='/mytrips/:id/edit' element={<TripForm />} />
          <Route path='/mytrips/:id/activities/:date' element={<Activities />} />
          <Route path='/mytrips/:id/addstay' element={<StayForm />} />
          <Route path='/mytrips/:id/addflight' element={<FlightForm />} />
          <Route path='/explore/:id' element={<PlaceDetails />} />
        </Routes>
    </div>
  )
}

export default App
