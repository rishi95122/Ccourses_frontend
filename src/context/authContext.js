import { createContext, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
 export const AuthContext =createContext()

 const AuthContextProvider=({children})=>{
const [currentUser,setCurrentUser]=useState(Cookies.get("access_token")?(JSON.parse(localStorage.getItem("user"))||null):null)
const nav= useNavigate()
const [input,setInput] =useState("")

const register= async(data)=>{
  
    try{
        await axios.post("/auth/register", data  )
        nav("/login")
      }
      catch(err){
  
      return err.response.data
      }
}
const forgot= async(data)=>{
   
  try{
      await axios.post("/auth/forgot", data  )
      nav("/login")
    }
    catch(err){
   
    return err.response.data
    }
}



const login= async(data)=>{
    try{
       const user= await axios.post("/auth/login", data  );

        localStorage.setItem("user",JSON.stringify(user.data))
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