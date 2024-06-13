import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import "./single.css"
import { MoonLoader } from 'react-spinners'
const Single = ({cat}) => {

    const [data,setData]=useState([])
    const [loading,setLoading]=useState()
    useEffect(()=>{
        
        async function getData(){
            setLoading(true)
            const dataa=await axios.post(`${process.env.REACT_APP_BACK_API}/course/getcoursesBycategory`,{
                category:cat
            })
           setData(dataa.data)
           setLoading(false)
        }
        getData()
       
    },[cat])
    console.log(loading)
  return (
    <div className='single'>
        {
            !loading? (data.map((item)=>{
                return (
                        <Link style={{textDecoration:"none"}} to={`/course/`+item.course} state={item}>
                      
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
            })):<div className='loading'> <MoonLoader color="#36d7b7" /> </div>
        }
    </div>
  )
}

export default Single