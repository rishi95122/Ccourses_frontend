import React from 'react'
import Carou from '../components/homepage/carousel/Carou'
import Container from '../components/homepage/homecontainer/Container'
import "./home.css"
const Home = () => {
  return (
    <div className='home'>
         <Carou />
            <Container />
    </div>
  )
}

export default Home