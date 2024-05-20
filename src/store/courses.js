import axios from "axios"


export const getData=async()=>{
        const dataa= await axios.get("/course/getallcourses")
     
      return dataa.data
    }

