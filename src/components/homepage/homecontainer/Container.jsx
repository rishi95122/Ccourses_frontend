import React, { useEffect, useState } from 'react'
import { data} from '../../../store/categories'
import Single from '../../singlecard/Single'
import "./container.css"
const Container = () => {
const [cat,setCat]=useState("Web Development")
const handleSub=(item)=>{
  setCat(item.category)
} 

  return (
    <div className='container'>
        <div>
        <h2>All best Courses you need in one place</h2>
       
        </div>
        <div className='categories'>
            {
                data.map((item,key)=>{
                    return <h5 key={key} className={cat===item.category?"selecth2":"h5"} onClick={()=>handleSub(item) }>{item.category}</h5>
                })
            }
        </div>
      
         <Single cat={cat} setCat={setCat}/>
       
    </div>
  )
}

export default Container