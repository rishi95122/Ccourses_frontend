import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import "./profile.css"
import { AuthContext } from '../context/authContext'
const Register = () => {
  const [email,setEmail]=useState("")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [user,setUser]=useState("Teacher")
  const {register}=useContext(AuthContext)
  const [err,setErr]=useState("")
  const handleRegister= async ()=>{
    const data={
      email:email,
      username:username,
      password:password,
      user:user
    }

    try{
    const err=  await register(data);
     setErr(err)
    }
    catch(err){
    
    }
    
  }
  return (
    <div className='parent-login'>
        <div className='register'>
        <h5> Create a new account</h5>
        <input placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder='Username'  onChange={(e)=>setUsername(e.target.value)}></input>
        <select  onChange={(e)=>setUser(e.target.value)}>
          <option value="Teacher">Teacher</option>
          <option value="Student" >Student</option>
        </select>
        <input placeholder='Password'  onChange={(e)=>setPassword(e.target.value)}/>
        <button onClick={handleRegister}>Register</button>
          <b>{err}</b>
        <Link to="/login"><a>Login</a></Link>
    </div>
    </div>
    
  )
}

export default Register