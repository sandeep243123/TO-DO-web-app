import React from 'react'
import style from './style.module.css'
function AboutUs() {
  return ( <div className={style.container}> <h1>About Us</h1> <p>Welcome to our <span className={style.highlight}>To-Do App</span>. We are dedicated to helping you track your tasks and boost your productivity.</p> <p>Our team is passionate about creating intuitive and efficient tools to manage your daily activities. With a focus on user-friendly design and robust functionality, our app is your go-to solution for staying organized.</p> <p>Thank you for choosing our app. Let's achieve great things together!</p> </div> );
}

export default AboutUs
