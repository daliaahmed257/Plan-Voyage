import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Explore from './components/Explore'
import MyTrips from './components/MyTrips'
import SignIn from './components/SignIn'
import Register from './components/Register'
import { CheckSession } from './services/Auth'
import { useEffect, useState } from 'react'

function App() {

  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    setUser(user)
  }

  useEffect(() => {
    console.log('Checking token on mount...');
    const token = localStorage.getItem('token')
    console.log('Token:', token);
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
      <main>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='mytrips' element={<MyTrips user={user}/>} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App