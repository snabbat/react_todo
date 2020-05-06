import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from '../../components/todo/AuthenticationService'
class TodoComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            description : '',
            targetDate : moment(new Date()).format('YYYY-MM-DD')


        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)

    }

    onSubmit(values){
        let username=AuthenticationService.getLoggedInUserName();
        if(this.state.id===-1){
            let todo = {
                description: values.description,
                targetDate: values.targetDate,
                username:username
            };
            TodoDataService.createTodo(username,todo)
        .then(() => this.props.history.push('/todos'))
        }else{
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate,
            username:username
        };
        TodoDataService.updateTodo(username,this.state.id,todo)
        .then(() => this.props.history.push('/todos'))
    }
    }



    validate(values){
        let errors={};
        if(!values.description){
            errors.description='Enter a Description'
        }else if (values.description.length<5){
         errors.description='Enter at least 5 characters in Description'   
        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate='Enter a valid Target Date'
        }


        return errors;
    }

    componentDidMount(){
        if(this.state.id===-1){
            return
        }
        let username=AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveTodo(username,this.state.id)
        .then(Response => console.log(this.setState({
          description:Response.data.description,
          targetDate:  moment(Response.data.targetDate).format('YYYY-MM-DD')
        })))

    }


    render() {
        let {description,targetDate}=this.state
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik  initialValues={{description,targetDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}

                    validate={this.validate}
                    enableReinitialize={true}
                    >
                        {
                            (props)=> (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                  <fieldset className="form-group">
                                      <label>Description</label>
                                      <Field className="form-control" type="text" name="description"/>                                  
                                  </fieldset>  
                                  <fieldset className="form-group">
                                      <label>Target Date</label>
                                      <Field className="form-control" type="date" name="targetDate"/>                                  
                                  </fieldset> 

                                  <button className="btn btn-success" type="submit">Save</button> 
                                </Form>
                            )
                        }


                        
                    </Formik>

                </div>
               
            </div>
        )
    }
}

export default TodoComponent;