// crud svc
import axios from 'axios';

// const api_url = 'http://localhost:8081/api/employee'
// const api_url = 'https://localhost:8081/api/employee'
// const api_url = 'https://localhost/api/employee'
// const api_url = '/api/employee'
const api_url = 'https://sodi9.store/api/employee'

const timeout = 2000;// 타임아웃을 2초로 설정


// export const listEmployee = ()=> {
//     return axios.get(api_url)
// }

// state object 가 전달이 한타임 느림
// export const retrieveEmployee = (state)=> {
//     console.log('state', JSON.stringify(state))
//     return axios.get(`${api_url}?size=${state.limit}&page=${state.activePage-1}`, { timeout })// Every request triggered twice 
// }
export const retrieveEmployee = (firstName, email, role, limit, activePage)=> {
    console.log('limit', JSON.stringify(limit))
    console.log('activePage', JSON.stringify(activePage))
    return axios.get(`${api_url}?firstName=${firstName}&email=${email}&role=${role}&size=${limit}&page=${activePage-1}`, { timeout })// Every request triggered twice 
}

export const createEmployee = (employee)=> axios.post(api_url, employee)

export const retrieveEmployeeById = (id)=> axios.get(`${api_url}/${id}` )

// export const updateEmployee = (id, employee)=> axios.put(`${api_url}/${id}`, employee)// id  데이터가 중복되므로 데이터를 
export const updateEmployee = (employee)=> axios.put(api_url, employee)

export const deleteEmployee = (id)=> axios.delete(`${api_url}/${id}` )