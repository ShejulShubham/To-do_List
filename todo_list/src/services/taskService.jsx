import axios from 'axios'
import config from "../config";

export async function getTasks(pageNumber){
  const response = await axios.get(`${config.url}/task/all?page=${pageNumber}`)
  // console.log(response.data);
  return response.data.data
}

export async function addTask(body){
  const response = await axios.post(`${config.url}/task/add`, body)
  // console.log(response.data);
  return response.data
}

export async function updateTask(body){
  const response = await axios.put(`${config.url}/task/update`, body)
  // console.log(response.data);
  return response.data
}

export async function deleteTask(taskId){
  const response = await axios.delete(`${config.url}/task/delete?id=${taskId}`)
  // console.log(response.data);
  return response.data
}
