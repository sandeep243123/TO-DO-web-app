import React, { useContext, useEffect, useState } from 'react'
import Task from './Task/Task'
import style from '../MyTask/style.module.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { addTask, taskList,deleteTask} from '../../../Service/TodoService';
import DataContext from '../../../context/LogContext';
import { Audio } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';

function MyTask() {
  const [taskData,setTaskData]=useState();
  const [flag,setFlag]=useState(false)
  useEffect(()=>{
    fetchTasks()
  },[])

  const notify = (e) => toast(e);

  const fetchTasks = async () => {
    setFlag(true)
    try {
      const res = await taskList();
      setTaskData(res);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
    setFlag(false)
  };
  const handleGetTask=()=>{
    console.log("data",taskData)
  }
  const handleDeleteTask = async (taskId) => {
    setFlag(true)
    try {
      await deleteTask(taskId);
      // Update the taskData to remove the deleted task
      setTaskData(prevTasks => prevTasks.filter(task => task.id !== taskId));
      await fetchTasks()
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
    notify("Task deleted Successfully")
    setFlag(false)
  };

  return flag?(flag&&<div style={{
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }}>
    <Audio
    height="80"
    width="80"
    radius="9"
    color="green"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass/>
  </div>):(
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
      {taskData?(taskData.map((item, index) => 
        <li style={{listStyle:"none"}} key={index}><Task
         title={item.title}
         desc={item.description}
         status={item.status}
         priority={item.priority}
         onDelete={handleDeleteTask}
         taskId={item._id}
         dueDate={item.dueDate}
         /></li>
      )):("")}
      </div>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="dark"
          transition: Bounce
          />
    </div>
  )
}

export default MyTask
