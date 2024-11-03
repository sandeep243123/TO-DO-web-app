import React from 'react'
import Task from './Task/Task'
import style from '../MyTask/style.module.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { taskList } from '../../../Service/TodoService';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
function MyTask() {

  const handleGetTask=async ()=>{
    const taskData=await taskList();
    console.log("**",taskData)
  }

  return (
    <div className={style.container}>
      <div className={style.menu}>
       <div className={style.left}>
        <h3>Tasks</h3>
       </div>
        <div className={style.search}>
          <input type="text" placeholder='Search Task' />
          <button onClick={handleGetTask}>Search</button>
        </div>
      </div>
      <div className={style.taskContainer}>
      {Array.from(Array(16)).map((_, index) => 
        <li style={{listStyle:"none"}} key={index}><Task/></li>
      )}
      </div>
    </div>
  )
}

export default MyTask
