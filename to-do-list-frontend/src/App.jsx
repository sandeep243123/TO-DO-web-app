import './App.css'
import Header from './components/Header/Header'
import Home from './components/HomeSection/Home'
import MyTask from './components/HomeSection/MyTask/MyTask'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <>
      <Header></Header>
      <div className='parent'>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/home' element={<Home/>}></Route>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
