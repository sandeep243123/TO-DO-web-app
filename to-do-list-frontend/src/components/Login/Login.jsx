import {React,useContext,useState} from 'react'
import style from '../Login/style.module.css'
import { loginUser } from '../../Service/TodoService'
import { Audio } from 'react-loader-spinner'
import { useNavigate} from 'react-router-dom'; // Import useHistory
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataContext from '../../context/LogContext';


function Login() {
  const {setUserId}=useContext(DataContext)
  const navigate = useNavigate(); // Initialize useHistory
  const [flag,setFlag]=useState(false)
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  
  const notify = (e) => toast(e);
  const handleLogin=async ()=>{
    setFlag(true);    
    const isAuthenticated=await loginUser(email,password)
    if (isAuthenticated.success==true) {
      setUserId(isAuthenticated.data._id)
      setFlag(false)
      navigate('/home'); // Change '/home' to your home route
    }else{
      notify(isAuthenticated)
    }
    setFlag(false)
  }
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
     <h1>Login</h1>
     <div className={style.inputDiv}>
      <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
     </div>
     <button className={style.logBtn} onClick={handleLogin}>Log In</button>
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
