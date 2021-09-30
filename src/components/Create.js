import React from 'react';
import { Link } from "react-router-dom";
import Api from "../services/api";

class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:"",
            email:"",
            errors:[]
        }
    }

    valueChange = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({state, errors:[]});
    }

    verifyError(element){
        return this.state.errors.indexOf(element) != -1;
    }

    sendData = (e) =>{
        e.preventDefault();

        const{name, email} = this.state;

        var errors = [];
        if(!name)errors.push("name_error");
        if(!email)errors.push("email_error");

        this.setState({errors:errors});
        if(errors.length > 0) return false;

        var sendData = {name:name, email:email}

        fetch(Api+"?insert=1", {
            method:"POST",
            body:JSON.stringify(sendData)
        })
        .then(response=>response.json())
        .then((responseData)=>{
            console.log(responseData);
            this.props.history.push("/");
        })
        .catch(console.log)
    }

    render() { 

        const{name, email} = this.state;

        return ( 
            <div className="card">
                <div class="card-header">
                    Employees
                </div>
                <div className="card-body">
                    <form onSubmit={this.sendData}>
                        <div className="form-group">
                          <label htmlFor="">Name:</label>
                          <input type="text" className={((this.verifyError("name_error"))?"is-invalid":"")+" form-control"} onChange={this.valueChange} value={name} name="name" id="name" aria-describedby="helpId" placeholder=""/>
                          <small id="helpId" className="invalid-feedback">Write the employee name</small>
                        </div>

                        <div class="form-group">
                          <label htmlFor="">Email:</label>
                          <input type="text" className={((this.verifyError("email_error"))?"is-invalid":"")+" form-control"} onChange={this.valueChange} value={email} name="email" id="email" aria-describedby="helpId" placeholder=""/>
                          <small id="helpId" className="invalid-feedback">Write the employee email</small>
                        </div>

                        <div class="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Add new employee</button>
                            <Link to={"/"} className="btn btn-primary">Cancel</Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">

                </div>
            </div>
        );
    }
}
 
export default Create;