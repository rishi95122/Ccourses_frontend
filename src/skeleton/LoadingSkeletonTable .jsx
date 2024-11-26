import React from 'react';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/system';



 function LoadingSkeletonTable() {
  
  return (
   [1,2,3].map(item=>{
    return  <tr key={item}>
            
    <td className="name-cell">
    
      <span> <Skeleton 
            variant="text" 
            width={120} 
            height={24}
          /></span>
    </td>
    <td> <Skeleton 
            variant="text" 
            width={200} 
            height={24}
          /></td>
    <td>   <Skeleton 
            variant="text" 
            width={80} 
            height={24}
          />
          </td>

    <td>
      <span>  <Skeleton 
            variant="text" 
            width={80} 
            height={24}
          /> </span>
    </td>
    <td style={{display:"flex",alignItems:"center"}}>


      <button 

      className="action-button">
       
      </button>
      <Skeleton 
              variant="circular" 
              width={24} 
              height={24} 
            />
      <button  
       
      className="action-button">
     <Skeleton 
              variant="circular" 
              width={24} 
              height={24} 
            />
      </button>
      
     
    </td>
  </tr>
   })
  );
}

export default LoadingSkeletonTable