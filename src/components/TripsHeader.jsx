import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { CheckSession } from '../services/Auth'

const TripsHeader = () => {

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

    let userOptions
    if (user) {
        userOptions = (
            <div className='trips-header'>
                <Link to="/mytrips">
                    <h3>My Trips</h3>
                </Link>
                <Link onClick={handleLogOut} to="/">
                    <h3>Sign Out</h3>
                </Link>
            </div>
        )
    }

    const publicOptions = (
        <div className='trips-header'>
            <Link to="register">
                <h3>Register</h3></Link>
            <Link to="/signin">
                <h3>Sign In</h3></Link>
        </div>
    )

    return (
        <header className='trips-header'>
            <Link to="/">
                <div>
                    <h1>Plan Voyage</h1>
                </div>
            </Link>
            <Link to="/">
                <h3>Explore</h3>
            </Link>
            {user ? userOptions : publicOptions}
        </header>
    )
}

export default TripsHeader