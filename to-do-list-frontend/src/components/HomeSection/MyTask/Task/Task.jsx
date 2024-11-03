import React from 'react'
import style from './style.module.css'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function Task() {
  return (
    <div className={style.container}>
      <div className={style.details}>
        <h1>Title</h1>
        <p>Descritpion - Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium sunt minus q</p>
      </div>
      <div className={style.actions}>
        <Button variant="contained">Done</Button>
        <Button variant="contained">Edit</Button>
        <Button variant="contained">Delete</Button>
      </div>
    </div>
  )
}

export default Task
