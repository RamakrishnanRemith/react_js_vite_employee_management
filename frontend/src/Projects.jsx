import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom'

function Projects() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const images = [
//     'images/backgroud.jpg',
//     'images/back2.jpeg',
//     'images/back3.jpeg',
//     // Add more image paths as needed
//   ];

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };
const navigate = useNavigate()
  return (
    <div className='red' >   
            <h1 class="background">My projects</h1>
            <br></br>
            <div class="card" >
                    <img src='images/backgroud.jpg'/>
                <div class="card-body">
                    <h5 class="card-title">Simple logins </h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/empmanagement" className="btn btn-primary ms-2" class="btn btn-primary">Emp Management</Link>
                </div>
            </div>
        <div class="card right" >
                    <img src='images/backgroud.jpg'/>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <button class="btn btn-primary">Youtube Clone</button>
                </div>
        </div>
        <div class="card right1" >
                    <img src='images/backgroud.jpg'/>
                <div class="card-body">
                    <h5 class="card-title">Simple logins </h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to="/bmi" className="btn btn-primary ms-2" class="btn btn-primary">Bmi calculator</Link>
                </div>
        </div>
    </div>
    
  );
}

export default Projects;