import React, {useState} from 'react'
import './style.css'



function Bmi() {

  // state
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')



  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault()

    if (weight === 0 || height === 0) {
      alert('Please enter a valid weight and height')
    } else {
      let bmi = ((weight / height / height) * 10000)
      setBmi(bmi.toFixed(1))

      // Logic for message
console.log(bmi)
      if (bmi < 18) {
        setMessage('You are underweight')
      } else if (bmi >= 18 && bmi < 25) {
        setMessage('You are a healthy weight')
      } else {
        setMessage('You are overweight')
      }
    }
  }

  //  show image based on bmi calculation
//   let imgSrc;

//   if (bmi < 1) {
//     imgSrc = null
//   } else {
//     if(bmi < 25) {
//       imgSrc = require('images/underweight.png')
//     } else if (bmi >= 25 && bmi < 30) {
//       imgSrc = require('images/healthy.png')
//     } else {
//       imgSrc = require('images/overweight.png')
//     }
//   }


  let reload = () => {
    window.location.reload()
  }

  return (
    <div className="app">
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div>
            <label>Height (in)</label>
            <input value={height} onChange={(event) => setHeight(event.target.value)} />
          </div>
          <div>
            <button className='btn btn-primary' type='submit'>Submit</button>
            <button className='btn btn-secondary' onClick={reload} type='submit'>Reload</button>
          </div>
        </form>

        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        <div className='img-container'>
          {/* <img src={imgSrc} alt=''></img> */}
        </div>
      </div>
    </div>
  );
}

export default Bmi;