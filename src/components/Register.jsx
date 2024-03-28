import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'


const Register = (props) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('test error message')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log('Form Values:', formValues);
      if (formValues.password !== formValues.confirmPassword) {
        setError('Passwords do not match. Please try again.')
        console.log('Error message:', error);
        return
      }
      await RegisterUser({
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      })
      setFormValues({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

      const payload = await SignInUser(formValues)
      props.setUser(payload)
      navigate('/mytrips')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signin-container'>
      <div className='signup-form'>
      <h1>Sign Up to Start Planning a Trip</h1>
        <br />
        <br />
        {error && <div className='error-message'>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <div><label htmlFor="name">Name:</label></div>
            <br />
            <input className='signin-input'
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="John Smith"
              value={formValues.name}
              required
            />
          </div>
          <br />
          <div>
            <div><label htmlFor="email">Email:</label></div>
            <br />
            <input className='signin-input'
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <br />
          <div>
            <div><label htmlFor="password">Password:</label></div>
            <br />
            <input className='signin-input'
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <br />
          <div>
            <div><label htmlFor="confirmPassword">Confirm Password:</label></div>
            <br />
            <input className='signin-input'
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <br />
          <br />
          <button className="form-btn">
            Sign up
          </button>
        </form>
      </div>

    </div>

  )
}

export default Register
