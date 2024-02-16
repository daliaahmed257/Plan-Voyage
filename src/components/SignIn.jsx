import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { useNavigate } from 'react-router-dom'

const SignIn = (props) => {

  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    navigate('/mytrips')
  }

  return (
    <div className='signin-container'>
      <div>
        <h1>Sign In</h1>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <div><label htmlFor="email">Email:</label></div>
            <br />
            <input
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
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <br />
          <br />
          <button className="form-btn" disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>

  )
}

export default SignIn