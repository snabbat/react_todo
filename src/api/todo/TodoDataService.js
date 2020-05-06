import Axios from "axios"
import { API_URL,JPA_API_URL } from '../../Constants'

class TodoDataService{
    retrieveAllTodos(name){
       return Axios.get(`${JPA_API_URL}/users/${name}/todos`);
        //console.log('executed Service')
    }

    retrieveTodo(name,id){
        return Axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`);
         //console.log('executed Service')
     }


    deleteTodo(name,id){
        return Axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`);
         //console.log('executed Service')
     }

     updateTodo(name,id, todo){
         console.log(todo)
         console.log(name)
        return Axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`,todo);
         //console.log('executed Service')
     }


     createTodo(name, todo){
        console.log(todo)
        console.log(name)
       return Axios.post(`${JPA_API_URL}/users/${name}/todos`,todo);
        //console.log('executed Service')
    }



}


export default new TodoDataService()