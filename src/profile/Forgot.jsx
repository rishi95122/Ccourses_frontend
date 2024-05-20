import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'


const Forgot = ({dis}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {forgot}=useContext(AuthContext)
    const [otp,setOtp]=useState("")
    const[err,setErr]=useState("")

    const handleForgot= async()=>{

    
      try{
        const err=await forgot({email:email,password:password,otp:otp})
          setErr(err)
        }
        catch(err){
          setErr(err.response.data)
        }
        
    }
    const handleOtp=async ()=>{
      setErr("")
      try{
       await axios.post("/auth/mail",{email:email})
     
        }
        catch(err){
          setErr(err.response.data)
      
        }
     
      }
  return (
<div className='parent-login'>
        <div className='register'>
        <h5> Forgot Password</h5>
        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
        <input onChange={(e)=>setOtp(e.target.value)} placeholder='Otp' /> 
        <button onClick={handleOtp}>Send</button>
        <input placeholder='Password'  onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleForgot}>Set Password</button>
          <b>{err}</b>
        <Link to={"/LOGIN"}><a>Login</a></Link>
    </div>
    </div>
  )
}

export default Forgot