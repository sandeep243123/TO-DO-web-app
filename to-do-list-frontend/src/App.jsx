import { useState,useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/HomeSection/Home'
import MyTask from './components/HomeSection/MyTask/MyTask'
import Login from './components/Login/Login'
import ProtectedRoute from './components/Route/ProtectedRoute'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicRoute from './components/Route/PublicRoute'
function App() {
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  // Simulating an authentication check
  useEffect(() => {
    // Check if the user is logged in by checking localStorage, a token, etc.
    const token = localStorage.getItem('token');
    console.log("app started",token)
    if(token)
      setIsAuthenticated(true);
    else
      setIsAuthenticated(false)
  },[]);

  return (
    <>
      <Header></Header>
      <div className='parent'>
        <Router>
          {/* public route */}
          <Routes>
          <Route path='/login' element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Login setIsAuthenticated={setIsAuthenticated}/>
              </PublicRoute>
            } />
            <Route path='/signup' element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <SignUp />
              </PublicRoute>
            } />
            {/* Protected route */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/home' element={<Home setIsAuthenticated={setIsAuthenticated}/>}></Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
