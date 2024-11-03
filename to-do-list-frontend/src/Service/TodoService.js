import axios from 'axios'
import { useContext } from 'react';
const URL = "http://localhost:4000/api/v1/"


const loginUser = async (email, password) => {
  const data = {
    "email": email,
    "password": password
  }
  try {
    const response = await axios.post(URL + "login", data);
    console.log(response)
    const tokenData = response.data.token
    localStorage.setItem("token", tokenData)
    return response.data
  } catch (error) {
    return error.response.data.message;
  }
}

const registerUser = async (obj) => {
  const data = {
    "name": obj.name,
    "email": obj.email,
    "password": obj.password
  }
  try {
    const response = await axios.post(URL + "signup", data)
    return response.data
  } catch (error) {
    console.log("Error", error.response.data.message)
    return error.response.data
  }
}

const addTask = async (obj) => {
  const data = {
    "title": obj.title,
    "description": obj.description,
    "dueDate": obj.dueDate,
    "priority": obj.priority,
    "status": obj.status,
    "createdBy": obj.id
  }
  try {
    const response = await axios.post(URL + "createTask", data);
    console.log(response.data)
  } catch (error) {
    console.log("error", error.response.data)
  }
}

const taskList = async () => {
  try {
    const tokenData = localStorage.getItem("token")
    const response = await axios.get(URL + "getTasks", {
      headers: {
        Authorization: `Bearer ${tokenData}`,
      },
      withCredentials: true
    })
    console.log(response.data)
  } catch (e) {
    console.log("Error with log", e)
  }

}

export { loginUser, taskList, registerUser, addTask }