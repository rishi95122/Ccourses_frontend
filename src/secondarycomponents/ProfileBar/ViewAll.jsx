
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { AuthContext } from "../../context/authContext";
import { getData } from '../../store/courses';
import "./profilebar.css"
import { MoonLoader } from 'react-spinners';
const ViewAll = () => {
const {input} =useContext(AuthContext)
    const [data,setData]=useState(null)
    const [search,setSearch]=useState(data)
    useEffect(()=>{
  
   getData().then(function (res){
      setData(res)
setSearch(res)
    })

    },[])
    useEffect(()=>{
      const updated= data?.filter((item)=>{
          const course=item.course.toLowerCase()
          const search=input.toLowerCase()

          return course.indexOf(search)!=-1
        })
      setSearch(updated)
    },[input])

  return (
    <div className='single-main'>
        <h1>Courses</h1>
          <div className='single'>
            {
              search? ( search?.map((item)=>{
                    return  <div className='card'>
                    <div className='img'>
                        <img src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${item.image}.png`} />

                    </div>
                    <div className='text'>

                    <h5>{item?.course}</h5>
                    
                    <h6>{item?.category}</h6>
                    <Link to={"/course/"+item.course+'='+item.username} state={item}><button>Open</button></Link>
                    
                    </div>
                </div>
                })):<MoonLoader color="#36d7b7" />
            }
        </div>
    </div>
  )
}

export default ViewAll