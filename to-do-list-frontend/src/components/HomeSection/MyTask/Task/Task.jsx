import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateStatus } from '../../../../Service/TodoService';

function Task({title,desc,onDelete,taskId,priority,dueDate,handleOnStatus,status}) {
  const [pColor,setpColor]=useState();
  useEffect(()=>{
    if(priority==='Medium')
      setpColor("yellow")
    else if(priority==="High")
      setpColor("red")
    else
      setpColor("green")
  },[])

  const handleOnDone=async ()=>{
    const res=await updateStatus(taskId,"Completed")
    handleOnStatus()
    console.log(res)
  }

  return (
    <div className={style.container} >
      <div className={style.details}>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className={style.actions}>
        <Button style={{backgroundColor:"rgb(41, 38, 38)",color:`${status==='Completed'?'green':'white'}`}} variant="contained" onClick={handleOnDone}><CheckCircleIcon/></Button>
        <Button style={{backgroundColor:"rgb(41, 38, 38)"}} variant="contained"><EditIcon/></Button>
        <IconButton aria-label="delete">
          <DeleteIcon style={{cursor:"pointer",color:"white"}} variant="contained" onClick={()=>onDelete(taskId)}>Delete</DeleteIcon>
        </IconButton>
        <Button variant='contained' style={{
          backgroundColor:"rgb(41, 38, 38)",
          color:`${pColor}`,
          fontWeight:"bold"
          }}>{priority}</Button>
        <Button style={{color:"gray"}}>{dueDate}</Button>
      </div>
    </div>
  )
}

export default Task
