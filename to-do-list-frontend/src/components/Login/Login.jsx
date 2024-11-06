import {React,useEffect,useState} from 'react'
import style from '../Login/style.module.css'
import { loginUser } from '../../Service/TodoService'
import { Audio } from 'react-loader-spinner'
import { useNavigate} from 'react-router-dom'; // Import useHistory
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Login({setIsAuthenticated}) {
  const initialValues={email:"",password:""}
  const navigate = useNavigate(); // Initialize useHistory
  const [flag,setFlag]=useState(false)
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState({})
  const [isSubmit,setIsSubmit]=useState(false);

  const notify = (e) => toast(e);
  
  const handleLogin=async ()=>{ 
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  
  useEffect(()=>{
    if(Object.keys(formErrors).length===0&&isSubmit){
      setFlag(true)
      loginUser(formValues).then((res)=>{
        if(res.success){
          setFlag(false)
          setIsAuthenticated(true)
          navigate('/home')
        }else{
          setFlag(false)
          notify(res)
        }
        setFormValues(initialValues)
      }).finally(()=>{
        setFlag(false)
      })
    }
    setIsSubmit(false)
  },[formErrors])

  const validate=(values)=>{
    const error={}
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
    return error
  }

  const onKeyPress=(event)=>{
    if (event.key === 'Enter') {
      handleLogin();
    }
  }

  const handleOnChange = (e) => {
    const {name,value}=e.target
    setFormValues({
      ...formValues,
      [name]:value
    })
  };

  const handleOnSignUp=()=>{
    navigate('/signup')
  }

  return flag?(<Audio
    height="80"
    width="80"
    radius="9"
    color="green"
    ariaLabel="loading"
    wrapperStyle
    wrapperClass/>):(
    <div className={style.container}>
     <img src="/file.png" alt="" /> 
     <h1>Login</h1>
     <form >
      <div className={style.inputDiv}>
        <input name='email' type="text" placeholder='Email' onChange={handleOnChange} />
        <p style={{color:"red",fontWeight:"bold",margin:"0"}}>{formErrors.email}</p>
        <input name='password' type="password" placeholder='Password' onChange={handleOnChange} onKeyDown={onKeyPress}/>
        <p style={{color:"red",fontWeight:"bold",margin:"0"}}>{formErrors.password}</p>
      </div>
     </form>
     <button className={style.logBtn} onClick={handleLogin}>Log In</button>
     <p onClick={handleOnSignUp} className={style.register}>Don't have an account? Sign Up</p>
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

export default Login
