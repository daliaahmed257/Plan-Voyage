import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Explore from './components/Explore'
import MyTrips from './components/MyTrips'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {

  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url =`${process.env.VITE_BASE_URL}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true});
      setUser(data.user._json);
    } catch (error) {
      console.log(error)
    }
}

useEffect(() => {
  getUser();
})

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Explore />} />
          {/* <Route path='mytrips' element={<MyTrips />} /> */}
          <Route path='/mytrips' element={user ? <MyTrips user={user}/> : <Navigate to="/login"/>} />
          <Route path='/login' element={user ? <Navigate to="/mytrips"/> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to="/mytrips"/> : <Signup />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
