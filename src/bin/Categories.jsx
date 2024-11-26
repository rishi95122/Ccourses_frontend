import React, { useState } from 'react'
import { data } from '../store/categories'
import { MdKeyboardArrowRight } from "react-icons/md";
import { SubCategories } from './SubCategories';

const Categories = () => {
    const [subCat,setsubCat]=useState([])
 
  return (
    <div className='nav-cat'>
      
        {
            data.map(item=>{
                return <div><p className='p'  onMouseOver={()=>{setsubCat(item.subcategory)}} >{item.category} <MdKeyboardArrowRight /></p>
                    {
                          <div>
                          <SubCategories item={subCat} />
                          </div>
                    }
                  
                </div>
            })
        }
    </div>  
  )
}

export default Categories