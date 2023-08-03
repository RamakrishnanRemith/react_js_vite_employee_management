import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
const ContactForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    comments: '',
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/send_email', values)
      .then((res) => {
        alert("Mailsend successfully")
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container" >
      <h2 className="text-primary mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className="form-control bg-light"
            placeholder="Name"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className="form-control  text-white"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="comments"
            className="form-control text-black"
            placeholder="Send your comments"
            onChange={(e) => setValues({ ...values, comments: e.target.value })}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">
          Send
        </button>
      </form>
      <Link to="/" className="btn btn-secondary ms-2">Back</Link>
      </div>
  );
};

export default ContactForm;