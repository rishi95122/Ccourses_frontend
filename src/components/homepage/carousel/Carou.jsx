import React from 'react'
import './carou.css'
import logo from "./1.jpg"
import logo2 from "./2.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Carou = () => {
  return (
    <Carousel>
    <div className='main-carou'>
      <div className='text'>
        <h2>Learning that gets you</h2>
        <p>Skills for your present (and your future). Get started with us. </p>
      </div>
        <img src={logo} />
      
    </div>
    <div>
        <img src={logo2} />
    </div>
    
</Carousel>
  )
}

export default Carou