import React, { useState } from 'react'
import { data} from '../../../store/categories'
import Single from '../../singlecard/Single'
import "./container.css"
const Container = () => {
const [cat,setCat]=useState("Web Development")
const handleSub=(item)=>{
  setCat(item.category)
} 
console.log("dsf",process.env.REACT_APP_BACK_API)
  return (
    <div className='container'>
        <div>
        <h2>All the skills you need in one place</h2>
        <p>From critical workplace skills to technical topics, our catalog supports well-rounded professional development.
</p>
        </div>
        <div className='categories'>
            {
                data.map((item,key)=>{
                    return <h5 key={key} className={cat===item.category?"selecth2":"h5"} onClick={()=>handleSub(item) }>{item.category}</h5>
                })
            }
        </div>
      
         <Single cat={cat} />
       
    </div>
  )
}

export default Container