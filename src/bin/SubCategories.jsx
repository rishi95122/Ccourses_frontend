import React from 'react'
import { data } from '../store/categories'

export const SubCategories = ({item}) => {
  return (
    <div className='sub-cat'>
      
        {
            item.map(item=>{
                return <div><p className='p'>{item} </p>
                   
                </div>
            })
        }
    </div>  
  )
}
