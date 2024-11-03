import React, { useEffect } from 'react'
import style from '../SignUp/style.module.css'
import { useState } from 'react';
import { Audio } from 'react-loader-spinner'
import { registerUser } from '../../Service/TodoService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function SignUp() {
  const initialValues={name:"",email:"",password:"",cpassword:""}
  const [formValues,setFormValues]=useState(initialValues);
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false);
  const [flag,setFlag]=useState(false);
  const navigate=useNavigate();

  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setFormValues({
      ...formValues,
      [name]:value
    })

  }
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    setFlag(true)
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  useEffect(()=>{
    if(Object.keys(formErrors).length===0&&isSubmit){
      registerUser(formValues).then((res)=>{
        console.log(res)
        if(res.success){
          notify(res.message)
          navigate('/login')
        }else{
          notify(res.message)
        }
      }).finally(()=>{
        setFlag(false)
      })
    }
    setIsSubmit(false)
  },[formErrors])

  const validate=(values)=>{
      const error={}
      if(!values.name){
        error.name="Name is required!"
      }else{
        const nameRegex = /^[A-Za-z]+(([',. -][A-Za-z ])?[A-Za-z]*)*$/;
        if(!nameRegex.test(values.name)){
          error.name="Enter valid Name"
        }
      }
      if(!values.email){
        error.email="Email is required!"
      }else{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = (email) => emailRegex.test(email);
        if(!isValidEmail(values.email))
          error.email="Enter correct email!"
      }
      if(!values.password){
        error.password="Password is required!"
      }
      if(!values.cpassword){
        error.cpassword="Confirm Password is required!"
      }else{
        if(values.password!==values.cpassword)
          error.cpassword="Password must be same!"
      }
      return error
  }
  const notify = (e) => toast(e);

  return flag?(flag&&<Audio
    height="80"
    width="80"
    radius="9"
    color="green"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass/>):(
    <div className={style.container}>
    <img src="/file.png" alt="" /> 
    <h1>Sign Up</h1>
    <form onSubmit={handleOnSubmit}>
        <div className={style.inputDiv}>
          <input name='name' type="text" placeholder='Your Name' value={formValues.name} onChange={handleOnChange}/>
          <p>{formErrors.name}</p>
          <input name='email' type="text" placeholder='Email' value={formValues.email} onChange={handleOnChange}/>
          <p>{formErrors.email}</p>
          <input name='password' type="password" placeholder='Password' value={formValues.password} onChange={handleOnChange}/>
          <p>{formErrors.password}</p>
          <input name='cpassword' type="password" placeholder='Confirm Password' value={formValues.cpassword} onChange={handleOnChange}/>
          <p>{formErrors.cpassword}</p>
        </div>
    </form>
    <button className={style.signBtn} onClick={handleOnSubmit}>Register</button>
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

export default SignUp
