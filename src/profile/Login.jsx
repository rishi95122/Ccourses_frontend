import React, { useContext, useEffect, useState } from 'react'
import { Link}from 'react-router-dom'
import axios from "axios"
import "./profile.css"
import { AuthContext } from '../context/authContext'
const Login = () => {
 
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [otp,setOtp]=useState("")
  const[resend,setResend]=useState(false)
  const[err,setErr]=useState("")
  const [seconds,setSeconds]=useState()
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
  useEffect(()=>{
const interval= setInterval(()=>{
if(seconds>0)
  {
    setSeconds(seconds-1)
  }
  if(seconds===0){
    setSeconds(null)
    setResend(false)
    clearInterval(interval)
  } 
},1000)
return ()=>{
  clearInterval(interval)
}
  },[seconds])

  const handleOtp=async ()=>{
    setSeconds(30)
    setResend(true)
    try{
      const err= await axios.post(`${process.env.REACT_APP_BACK_API}/auth/mail`,{email:email})
        setErr(err)
      }
      catch(err){
        setErr(err.response.data)
      }
      
      
  }
 console.log(resend)
  return (
    <div className='parent-login'>
        <div className='loginn'>
        <h5> Login to your account.</h5>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input>
        <input onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
        <input onChange={(e)=>setOtp(e.target.value)} placeholder='Otp' /> 
        <button onClick={handleOtp} disabled={resend} style={resend ? { backgroundColor:"gray"}:{backgroundColor:"rgb(181, 110, 248)"}}> {resend? <p>Resend in {seconds}</p>:<p>send</p>}</button>
        <button onClick={handleLogin}>Login</button>
      <b>{err}</b>
        <Link to="/forgot"><a>Forgot Password</a></Link>
    </div>
    </div>
    
  )
}

export default Login
