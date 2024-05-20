import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { courses } from '../store/categories'
import "./single.css"
const SingleCourse = () => {
  const id=useParams().id
  console.log(id)

 
  const single=courses.find((item)=>item.id==id)
  function handleAdd(){
    localStorage.setItem("cart",JSON.stringify(single))
  }
  return (
    <div className='singlecourse'>
      <div className='img'>
       <img src={single.img}/>
      </div>
      <h2>{single.title}</h2>
      <p>{single.desc}</p>

      <div className='info'>
        <p>Bestseller</p>
        <p>{single.rating}</p>
        <p>{single.reviews} ratings</p>
      </div>
      <p>Created by {single.author}</p>

      <button onClick={handleAdd}>Add to Cart</button>

      <div className='content'>
        <h2>Course Content </h2>

      </div>
    </div>
  )
}

export default SingleCourse