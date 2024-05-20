import React, { useEffect, useState } from 'react'
import { getData } from '../../../store/courses'
import "./navsearch.css"
import { Link } from 'react-router-dom'
const NavSearch = () => {
    const [input,setInput]=useState("")
    const [data,setData]=useState(null)
    const [search,setSearch]=useState(data)
    useEffect(()=>{
       
   getData().then(function (res){
      setData(res)
setSearch(res)
    })
    },[])
    useEffect(()=>{
      const updated= data?.filter((item)=>{
          const course=item.course.toLowerCase()
          const search=input.toLowerCase()

          return course.indexOf(search)!=-1
        })
      setSearch(updated)
    },[input])
  return (
    <div className='navsearch'>
        <div>
            <input onChange={(e)=>{setInput(e.target.value)}} placeholder='Search for Anything'/>
        </div>
        <div className='searchsection'>
        {input.length>0&& <div >
                    {
                        search?.map((item)=>{
                           return <Link style={{textDecoration:"none"}} to={"/course/"+item.course} state={item} ><div className='section-item'>
                                      <img src={`http://res.cloudinary.com/drlewouwd/image/upload/v1710917678/${item.image}.png`} />
                           <div>
                            <h5>{item.course}</h5>
                            <p>{item.username}</p>
                            </div>
                            </div>
                            </Link>
                        })
                    }
        </div>}
        </div>
      
    </div>
  )
}

export default NavSearch