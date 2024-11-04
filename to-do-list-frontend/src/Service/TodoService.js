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
    localStorage.setItem("userId", response.data.data._id)
    localStorage.setItem("token", response.data.token)
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
  const token = localStorage.getItem("token")
  const data = {
    "title": obj.title,
    "description": obj.description,
    "dueDate": obj.dueDate,
    "priority": obj.priority,
    "status": obj.status,
    "createdBy": localStorage.getItem("userId"),
    "tags": ["hii", "user"],
  }
  console.log(data)
  try {
    const response = await axios.post(URL + "createTask", data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("error", error.response.data)
  }
}

const deleteTask = async (taskId) => {
  try {
    const data = {
      "userId": localStorage.getItem("userId"),
      "taskId": taskId
    }
    const response = await axios.post(URL + "deleteTask", data, {
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
}

const taskList = async () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  try {
    const response = await axios.get(URL + "getTasks/" + userId, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      params: { userId: userId }  // Passing userId as a query parameter
    });
    return response.data.data;
  } catch (e) {
    console.log("Error with log", e.response.data);
  }
}
export { loginUser, taskList, registerUser, addTask, deleteTask }