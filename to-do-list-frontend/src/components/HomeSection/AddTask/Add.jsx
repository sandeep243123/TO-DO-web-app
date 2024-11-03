import React, { useState,useEffect, useContext } from 'react'
import style from './style.module.css'
import Calendar from '../Calendar/Calendar'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { addTask } from '../../../Service/TodoService';
import { ToastContainer, toast } from 'react-toastify';
import DataContext from '../../../context/LogContext';

function Add() {
  const {userId}=useContext(DataContext)
  const initialValues={title:"",description:"",priority:"Medium",dueDate:"",category:"",_id:""}
  const [date,setDate]=useState();
  const [formValues,setFormValues]=useState(initialValues);
  const [isSubmit,setIsSubmit]=useState(false);
  const [flag,setFlag]=useState(false);
  const [formErrors,setFormErrors]=useState({})
  
  const notify = (e) => toast(e);

  const handleOnChange = (e) => {
    const {name,value}=e.target
    setFormValues({
      ...formValues,
      [name]:value
    })
  };
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    setFlag(true)
    formValues.dueDate=date
    formValues._id=userId
    setFormErrors(validate(formValues))
    console.log(formErrors)
    setIsSubmit(true)
  }
  useEffect(()=>{
    if(Object.keys(formErrors).length===0&&isSubmit){
      console.log(formValues)
      addTask(formValues).then((res)=>{
        console.log("result",res)
        // if(res.success){
        //   notify(res.message)
        // }else{
        //   notify(res.message)
        // }
      }).finally(()=>{
        setFlag(false)
      })
    }
    setIsSubmit(false)
  },[formErrors])

  const validate=(values)=>{
    const error={}
    if(!values.title){
      error.title="Name is required!"
    }
    return error
  }
  return (
    <div className={style.container}>
      <h1>Make your TO DO List</h1>
      <div className={style.formContainer}>
      <div className={style.form}>
        <div className={style.imgContainer}>
         <img src="/addTask.png" alt="" />
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className={style.inputTask}>
            <p>Title</p>
            <input name='title' type="text" placeholder='Enter task Name' value={formValues.title} onChange={handleOnChange}/>
            <p style={{color:"red",fontWeight:"bold",marginTop:"-0px",fontSize:"1.0rem"}}>{formErrors.title}</p>
            <p>Description</p>
            <input name='description' type="text" placeholder='description(optional)' value={formValues.description} onChange={handleOnChange}/>
            <p>Due Date</p>
            <div className={style.calendar}>
              <Calendar name='dueDate' setDate={setDate} value={date} trackChanges={handleOnChange}></Calendar>
            </div>
            <div className={style.priority}>
              <p>Priority</p>
              <Box sx={{ 
                minWidth: 120,
                backgroundColor:"white" ,
                height:"50px",
                width:"200px",
                marginTop:"15px",
                borderRadius:"10px",
                outline:"none"
                }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                  <Select
                    name='priority'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formValues.priority}
                    label="Priority"
                    onChange={handleOnChange}
                  >
                    <MenuItem value={"Low"}>Low</MenuItem>
                    <MenuItem value={"Medium"}>Medium</MenuItem>
                    <MenuItem value={"High"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <p>Category</p>
            <input name='category' type="text" placeholder='Enter category of the task' value={formValues.category} onChange={handleOnChange}/>    
          </div>
        </form>
        <div className={style.btnSection}>
          <button>Reset</button>
          <button onClick={handleOnSubmit}>Add</button>
        </div>
      </div>
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

export default Add
