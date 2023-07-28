import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import Validation from'./SignupValidation';
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues({...values, [event.target.name]:[event.target.value]})
    }       

    const navigate = useNavigate()
   
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Check if there are any errors before submitting the form
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Values:', values);
      axios.post('http://localhost:8081/signup', values)
      .then(res => {
        navigate('/login')
    })
      .catch((error) => {
        // Handle network errors
        if (error.response) {
          // Server responded with a status code outside the 2xx range
          console.log('Server Error:', error.response.data);
        } else if (error.request) {
          // The request was made, but no response was received
          console.log('No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error:', error.message);
        }
      });
       
    }
  };
    


    return (
    <div className='d-flex justify-content-center align-items-center vh-100 vw-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <form  onSubmit={handleSubmit}>
                     <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email'  
                       onChange={handleInput} className='form-control rounded-0'/>
                       {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div> 
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                         onChange={handleInput} className='form-control rounded-0'/>
                         {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>         
                            
                        <button type='submit' className='btn btn-success w-100'> Sign Up</button>
                            <p>You are agree to aour terms and policies</p>
                        <button className='btn btn-success w-100 bg-dark'>Login</button>
            </form>
        </div> 
    </div>
    )

}

export default Signup