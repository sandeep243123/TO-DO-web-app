import React, { useState } from 'react'
import style from '../TabSection/style.module.css'
import style1 from '../TabSection/style1.module.css'
import { tabData } from './TabData'

function Tab({selectItem}) {
  const [active,setActive]=useState(null);  
  const handleClick=async (index)=>{
    await selectItem(index);
    await setActive(index);
  }
  return (
    <div className={style.container}>
      <div className={style.liContainer}>
        {
          tabData.map((item,index)=>{
            return(
              <div 
              key={index} 
              className={`${style.liItem} ${active===index+1?style1.liItem:""}`}   
              onClick={()=>handleClick(item.id)}
              >
                <p>{item.title}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Tab
