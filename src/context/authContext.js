import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
 export const AuthContext =createContext()

 const AuthContextProvider=({children})=>{
const [currentUser,setCurrentUser]=useState()
const nav= useNavigate()
const [input,setInput] =useState("")



const register= async(data)=>{
  
    try{
        await axios.post(`${process.env.REACT_APP_BACK_API}/auth/register`, data  )
        nav("/login")
      }
      catch(err){
  
      return err.response.data
      }
}
const forgot= async(data)=>{
   
  try{
      await axios.post(`${process.env.REACT_APP_BACK_API}/auth/forgot`, data  )
      nav("/login")
    }
    catch(err){
   
    return err.response.data
    }
}



const login= async(data)=>{
    try{
       const user= await axios.post(`${process.env.REACT_APP_BACK_API}/auth/login`, data ,{
        withCredentials:true
       } );

      
        setCurrentUser(user.data)
        nav("/")
      }
      catch(err){
      return err.response.data
      }
}
 


    return <AuthContext.Provider value={{register,login,forgot,currentUser,setCurrentUser,input,setInput}}>
        {children}
    </AuthContext.Provider>
 }

 export default AuthContextProvider