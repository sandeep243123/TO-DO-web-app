import React, { useContext, useEffect, useState } from 'react'
import Task from './Task/Task'
import style from '../MyTask/style.module.css'
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { addTask, taskList,deleteTask, getAllTask} from '../../../Service/TodoService';
import DataContext from '../../../context/LogContext';
import { Audio } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


function MyTask() {
  const [taskData,setTaskData]=useState();
  const [flag,setFlag]=useState(false)
  const [serachData,setSearchData]=useState('');
  const [totalData,setTotalData]=useState();
  const [taskStatus,setTaskStatus]=useState('Pending')
  const [selectedButton, setSelectedButton] = useState("Pending");

  useEffect(()=>{
    fetchTasks()
  },[])

  useEffect(()=>{
    fetchTasks()
  },[taskStatus])
  const notify = (e) => toast(e);

  const fetchTasks = async () => {
    setFlag(true)
    try {
      const res = await taskList(taskStatus);
      setTotalData(res);
      setTaskData(res);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
    setFlag(false)
  };
  const handleGetTask=()=>{
    const lowerSearchData=serachData.toLowerCase();
    const data=taskData.filter(record => record.title.toLowerCase().includes(lowerSearchData.toLowerCase())||record.description.toLowerCase().includes(lowerSearchData.toLowerCase())||record.priority.toLowerCase().includes(lowerSearchData.toLowerCase()));
    setTaskData(data)
  }
  const handleOnChange=(e)=>{
    if(e.target.value===''){
      setTaskData(totalData)
    }
    setSearchData(e.target.value)
  }
  const handleOnKeyDown=(e)=>{
    if(e.key==='Enter'){
      handleGetTask()
    }
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
  const handleOnComplete=(e)=>{
    fetchTasks(e)
    setTaskStatus(e)
    setSelectedButton(e)
  }
  const handleOnAll= async ()=>{
   
    const data=await getAllTask();
    setTaskData(data);
    setSelectedButton("All")
  }
  
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
       <ButtonGroup variant="contained" aria-label="Basic button group" style={{marginTop:"15px"}}>
          <Button style={{backgroundColor:selectedButton === "All" ? "white" : "gray",color:'black'}} onClick={handleOnAll}>All</Button>
          <Button style={{backgroundColor:selectedButton === "Completed" ? "white" : "gray",color:'black'}} onClick={()=>handleOnComplete("Completed")}>Completed</Button>
          <Button style={{backgroundColor:selectedButton === "Pending" ? "white" : "gray",color:'black'}} onClick={()=>handleOnComplete("Pending")}>Pending</Button>
    
       </ButtonGroup>
        <div className={style.search}>
          <input type="text" placeholder='Search Task' onChange={handleOnChange} onKeyDown={handleOnKeyDown}/>
          <button onClick={handleGetTask}>Search</button>
        </div>
      </div>
      <div className={style.taskContainer}>
      {taskData?(taskData.map((item, index) => 
        <li style={{listStyle:"none"}} key={index}><Task
         title={item.title}
         desc={item.description}
         handleOnStatus={fetchTasks}
         priority={item.priority}
         onDelete={handleDeleteTask}
         taskId={item._id}
         dueDate={item.dueDate}
         status={item.status}
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
