import axios from "axios"


export const getData=async()=>{
        const dataa= await axios.get(`${process.env.REACT_APP_BACK_API}/course/getallcourses`)
     
      return dataa.data
    }

