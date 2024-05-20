import React, { useContext, useState } from 'react'
import { Link}from 'react-router-dom'
import axios from "axios"
import "./profile.css"
import { AuthContext } from '../context/authContext'
const Login = () => {
 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [otp,setOtp]=useState("")
  const[err,setErr]=useState("")
  const {login}=useContext(AuthContext)
  const handleLogin= async ()=>{
    const data={
    
      email:email,
      password:password,
      otp:otp
    }
    try{
    const err=await login(data)
      setErr(err)
    }
    catch(err){
      setErr(err.response.data)
    }
    
  }

  const handleOtp=async ()=>{
    try{
      const err= await axios.post("/auth/mail",{email:email})
        setErr(err)
      }
      catch(err){
        setErr(err.response.data)
      }
      
      
  }
 
  return (
    <div className='parent-login'>
        <div className='loginn'>
        <h5> Login to your account</h5>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <input onChange={(e)=>setOtp(e.target.value)} placeholder='Otp' /> 
        <button onClick={handleOtp}>Send</button>
        <button onClick={handleLogin}>Login</button>
      <b>{err}</b>
        <Link to="/forgot"><a>Forgot Password</a></Link>
    </div>
    </div>
    
  )
}

export default Login