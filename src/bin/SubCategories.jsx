import React from 'react'

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
