import Axios from "axios"

class HelloWorldService{
    executeHelloWorldService(){
       return Axios.get('http://localhost:8081/hello-world');
        //console.log('executed Service')
    }
    executeHelloWorldBeanService(){
        return Axios.get('http://localhost:8081/hello-world-bean');
         //console.log('executed Service')
     }
     executeHelloWorldPathVariableService(name){
        //  let username='soufiane'
        //  let password='password'
        //  let basicAthHeader='Basic ' + window.btoa(username + ":" + password)
        return Axios.get(`http://localhost:8081/hello-world/path-variable/${name}`
        // ,
        // {
        //     headers:{
        //         authorization : basicAthHeader
        //     }
        // }
        );
         //console.log('executed Service')
     }




}


export default new HelloWorldService()