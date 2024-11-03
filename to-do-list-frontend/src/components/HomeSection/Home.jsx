import React, { useState } from 'react'
import style from '../HomeSection/style.module.css'
import Tab from './TabSection/Tab'
import Welcome from './Welcome/Welcome';
import Add from './AddTask/Add'
import MyTask from './MyTask/MyTask';
function Home() {
  const [selectedItem,setSelectedItem]=useState(0);
  function handleOption(){
    switch(selectedItem){
      case 1:
        return 1
      case 2:
        return <Add></Add>
      case 3:
        return <MyTask></MyTask>
      case 4:
        return 4
      case 5:
        return 5
      case 6:
        return 6
      default:
        return <Welcome></Welcome>
    }
  }
  return (
    <div className={style.container}>
      <Tab selectItem={setSelectedItem}></Tab>
      {
        handleOption()
      }
    </div>
  )
}

export default Home
