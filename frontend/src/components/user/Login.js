
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/cover.jpg'

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post('http://localhost:5000/api/userRoutes/login', { email, password })
      if (data.message === 'Invalid email or password') {
        alert("User dosen't exists!")
      } else {
        localStorage.setItem('userInfo', JSON.stringify(data))
        navigate('/create')
      }
    } catch (error) {
      alert("Something went wrong.")
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
    <div className='container login'>
      <div className='row'>
        <div className='col d-flex flex-col justify-content-center align-items-center border rounded py-4 bg-light'>
          <div className='border rounded p-4'>
            <h1>Welcome Back!</h1>
            <p>Enter your Credentials to access your account</p>
            <form onSubmit={submitHandler}>
              <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className='btn btn-primary'>Signin</button>
            </form>
            <p className='my-4 text-center'>Don't have an account?
              <Link to="/" style={{ textDecoration: "none" }}><span>Signup</span></Link>
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

export default LoginPage
