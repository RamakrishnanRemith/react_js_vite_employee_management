import React, { useState } from 'react'
import './style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                navigate('/');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 vw-100 loginPage'>
        <div className='p-3 rounded w-200 loginForm'>
        <div className='text-danger'>
                    {error && error}
                </div>
            <h2 className='d-flex' >Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email" className='d-flex'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email' 
                    onChange={e => setValues({...values, email: e.target.value})}  className='form-control rounded-2' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password" className='d-flex'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={e => setValues({...values, password: e.target.value})}   className='form-control rounded-2' />
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-2'> Log in</button>
                <p>You are agree to aour terms and policies</p>                
            </form>
        </div>
    </div>
    )
  }
  
  export default Login