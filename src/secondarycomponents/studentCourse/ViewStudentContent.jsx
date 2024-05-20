import React, { useEffect, useState } from 'react'

import "./studentcourse.css"
import ReactPlayer from 'react-player';
import { MoonLoader } from 'react-spinners';
const ViewStudentContent = ({content,loading}) => {
const [open,setOpen]=useState()
  return (
    <div className='addcontent'>
  
        <div className='content'>
            {
           !loading ? (content &&  content.map((item,idx)=>{
                return <div className='inner-content' onClick={()=>{setOpen(idx)}}>
                <p> Video {idx+1}</p>
                 <div>
                  {open===idx &&         <ReactPlayer
      url={`   https://www.youtube.com/embed/${item.contentname}`}
      width="640px"
      height="440px"
      controls
    />           }



                  </div>
                </div>
              })):<div className='loading'> <MoonLoader color="#36d7b7" /> </div>
            }
        </div>
    </div>
  )
}

export default ViewStudentContent