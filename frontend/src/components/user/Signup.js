import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/cover.jpg'

const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('http://localhost:5000/api/userRoutes/register', { name, email, password })
      if (data.message === 'Ok') {
        alert("Registration Successfull")
        navigate('/login')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (userInfo) {
      navigate('/create')
      return
    }
  }, [])

  return (
    <div className='container signup'>
      <div className='row'>
        <div className='col d-flex flex-col justify-content-center align-items-center border rounded py-4 bg-light'>
          <div className='border rounded p-4'>
            <h3>Welcome To</h3>
            <h2>Iteractive StoryTelling</h2>
            <p>Signup for enjoy our service</p>
            <form onSubmit={submitHandler}>
              <input type="text" className="form-control mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className='btn btn-primary'>Signup</button>
            </form>
            <p className='my-4 text-center'>Already have an account?
              <Link to="/login" style={{ textDecoration: "none" }}><span>Signin</span></Link>
            </p>
          </div>
        </div>
        <div className='col'>
          <img src={img} alt='image' className='rounded' width={'100%'} height={'100%'} />
        </div>
      </div>
    </div>
  )
}

export default Signup
