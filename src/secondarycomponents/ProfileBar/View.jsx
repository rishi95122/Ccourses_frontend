
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import Cookies from 'js-cookie';
import {MoonLoader} from "react-spinners"
import { AuthContext } from '../../context/authContext'
import "./profilebar.css"
import {Link} from "react-router-dom"
const View = () => {
    const {currentUser}=useContext(AuthContext)
    const [data,setData]=useState(null)
    const token=Cookies.get("access_token")
   
    useEffect(()=>{
       
        async  function getData(){
            const dataa= await axios.post(`${process.env.REACT_APP_BACK_API}/course/get`,{name:currentUser.username},{headers: {
                'authorization': 'Bearer '  + token
              }})
             
            setData(dataa.data)
        }
        getData()
    },[])

  return (
    <div className='single-main'>
        <h1>Your Courses</h1>
        <div className='single'>
            
            {
               data ? (data?.map((item)=>{
                    return  <div className='card'>
                    <div className='img'>
                        <img src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${item.image}.png`} />

                    </div>
                    <div className='text'>

                    <h5>{item?.course}</h5>
                  
                    <h6>{item?.category}</h6>
                    <Link to={"/teacher/course/"+item.course} state={item}><button>Add Content</button></Link>
                    
                    </div>
                </div>
                })):<MoonLoader color="#36d7b7" />
            }
        </div>
    </div>
  )
}

export default View
