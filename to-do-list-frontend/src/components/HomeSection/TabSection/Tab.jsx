import React, { useState } from 'react'
import style from '../TabSection/style.module.css'
import style1 from '../TabSection/style1.module.css'
import { tabData } from './TabData'
import {useNavigate} from 'react-router-dom'

function Tab({selectItem,setIsAuthenticated}) {
  const navigate=useNavigate();
  const [active,setActive]=useState(null);  
  const handleClick=async (index)=>{
    await selectItem(index);
    await setActive(index);
  }

  const handleOnLogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false)
    navigate('/login')
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
        <div style={{
          display: "flex",
          justifyContent: "center",
          margin: "5px",
          backgroundColor: "red",
          cursor: "pointer",
          fontWeight: "bold",
          
          }}
          onClick={handleOnLogout}
          >
          <p>LogOut</p>
        </div>
      </div>
    </div>
  )
}

export default Tab
