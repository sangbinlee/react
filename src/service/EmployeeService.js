// crud svc


import axios from 'axios'

// const api_url = 'http://localhost:8081/api/employee'
// const api_url = 'https://localhost:8081/api/employee'
const api_url = 'https://localhost/api/employee'
// const api_url = '/api/employee'

// export const listEmployee = ()=> {
//     return axios.get(api_url)
// }
export const retrieveEmployee = ()=> axios.get(api_url)// Every request triggered twice 

export const createEmployee = (employee)=> axios.post(api_url, employee)

export const retrieveEmployeeById = (id)=> axios.get(`${api_url}/${id}` )

// export const updateEmployee = (id, employee)=> axios.put(`${api_url}/${id}`, employee)// id  데이터가 중복되므로 데이터를 
export const updateEmployee = (employee)=> axios.put(api_url, employee)

export const deleteEmployee = (id)=> axios.delete(`${api_url}/${id}` )