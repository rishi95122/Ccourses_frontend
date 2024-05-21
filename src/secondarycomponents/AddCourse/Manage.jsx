import React, { useContext, useState } from 'react'
 import "./AddCourse.css"
 import axios from "axios"
import { AuthContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manage = () => {
  const {currentUser}=useContext(AuthContext)
const [input,setInput]=useState("")
const [desc,setDesc]=useState("")
const [image,setImage]=useState("")
const [category,setCategory]=useState("Web Development")
const nav=useNavigate()
function submitData(e){
   
    const data=new FormData()
    data.append("file",e.target.files[0])
    data.append("upload_preset","demoapp")
    data.append("cloud_name","drlewouwd ")
   
    fetch(process.env.REACT_APP_CLOUDINARY_API,{
    method:"post",
    body:data}
    ).then((res)=>res.json()).then((data)=>{
    
      setImage(data.public_id)
    })
} 

  const handleClick=async ()=>{
    try{
      await axios.post(`${process.env.REACT_APP_BACK_API}/course/add`,{
        name:input,
        username:currentUser.username,
        image:image,
        description:desc,
        category:category
      })

      nav("/teacher/view")
    }
    catch(err){
     toast(err.response.data)
    }
  }
  return (
    <div className='main-addcourse'>
    
    <div className='addnewcourse'>
    <h2>Add A New Course.</h2>
    <div className='form'>
    <div className='in'>
    <label>Thumbnail:</label>
      <input onChange={(e)=>submitData(e)} placeholder='thumbnail' type="file" />

    </div>
    <div className='in'>
    <label>Course Name:</label>
    <input onChange={(e)=>{setInput(e.target.value)}} placeholder='Course Name'/>
    
    </div>
    <div className='in'>
      <label>Course Description:</label>
    <input onChange={(e)=>{setDesc(e.target.value)}} placeholder='Course Description'/>
       
      </div>
      <div className='in'>
      <label>Category</label>
      <select onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Communication">Communication</option>
          <option value="Buisness">Buisness</option>
        </select>
      </div>
     
      
        <button onClick={handleClick}>Add</button>
    </div>
   
      </div>
      <ToastContainer />
    </div>
  )
}

export default Manage

