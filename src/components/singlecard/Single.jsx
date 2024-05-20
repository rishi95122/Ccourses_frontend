import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./single.css"
const Single = ({cat}) => {

    const [data,setData]=useState([])
    useEffect(()=>{
        async function getData(){
            const dataa=await axios.post("/course/getcoursesBycategory",{
                category:cat
            })
           setData(dataa.data)
        }
        getData()
    },[cat])
  return (
    <div className='single'>
        {
            data.map((item)=>{
                return (
                        <Link style={{textDecoration:"none"}} to={"/course/"+item.course} state={item}>
                      
                         <div className='card'>
                            <div className='img'>
                                <img src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${item.image}.png`} />

                            </div>
                            <div className='text'>

                            <h5>{item?.course}</h5>
                        
                            <h6>{item?.username}</h6>
                           
                            
                            </div>
                        </div>
                
                    </Link >
                )
            })
        }
    </div>
  )
}

export default Single