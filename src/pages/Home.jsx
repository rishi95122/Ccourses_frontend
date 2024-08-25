import React from 'react'
import Carou from '../components/homepage/carousel/Carou'

import "./home.css"
import Container from '../components/homepage/carousel/homecontainer/Container'
const Home = () => {
  return (
    <div className='home'>
         <Carou />
            <Container />
    </div>
  )
}

export default Home