import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomComponent extends Component{
    constructor(props){
        super(props)
        this.retrieveWelcomeMessage=this.retrieveWelcomeMessage.bind(this)
        this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
        this.handleError=this.handleError.bind(this)
        this.state={
            welcomeMessage :''
        }
    }
    render(){
        return (
            <>
                <h1> Welcome !</h1>
                <div className="container">
                    Weclome {this.props.match.params.name}. You can Manage your todos<Link to="/todos">Here</Link> 
                </div>
                <div className="container">
                     Click here to get customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </>
        );

        
    }

    retrieveWelcomeMessage(){
        // HelloWorldService.executeHelloWorldService()
        // .then(Response => this.handleSuccessfulResponse(Response));
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(Response => this.handleSuccessfulResponse(Response));
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(Response => this.handleSuccessfulResponse(Response))
        .catch(error => this.handleError(error))
    }
    handleSuccessfulResponse(Response){
        console.log(Response)
        this.setState({welcomeMessage:Response.data.message})
    }
    handleError(error){
        //console.log(Error.response)
        let errorMessage='';
        if(error.message){
            errorMessage+=error.message;
        }
        if(error.response && error.response.data){
            errorMessage+=error.response.data.message;
        }
         
        this.setState({welcomeMessage:errorMessage})
    }
}

export default WelcomComponent;