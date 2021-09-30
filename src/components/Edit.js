import React from 'react';
import { Link } from "react-router-dom";
import Api from "../services/api";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loadedData:false, 
            employee:[]
        }
    }

    valueChange = (e) =>{
        const state = this.state.employee;
        state[e.target.name] = e.target.value;
        this.setState({employee:state});
    }

    sendData = (e) =>{
        e.preventDefault();
        const{id, name, email} = this.state.employee;

        var sendData = {id:id, name:name, email:email}

        fetch(Api+"?update=1", {
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

    componentDidMount() {
        console.log(this.props.match.params.id);

        fetch(Api+"?consult="+this.props.match.params.id)
        .then(response=>response.json())
        .then((responseData)=>{
            console.log("=>"+responseData);
            this.setState({ 
                loadedData:true, 
                employee:responseData[0] 
            })
        })
        .catch(console.log)
    }

    render() { 
        const{loadedData, employee}=this.state

        if(!loadedData) { return(<div>Loading...</div>); }
        else {
            return ( <div className="card">
                <div className="card-header">
                    Edit employees
                </div>
                <div className="card-body">
                    <form onSubmit={this.sendData}>
                        <div className="form-group">
                            <label htmlFor="">Key:</label>
                            <input type="text" readOnly className="form-control" onChange={this.valueChange} value={employee.id} name="id" id="id" aria-describedby="helpId" placeholder=""/>
                            <small id="helpId" className="form-text text-muted">Key</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Name:</label>
                            <input required type="text" className="form-control" onChange={this.valueChange} value={employee.name} name="name" id="name" aria-describedby="helpId" placeholder=""/>
                            <small id="helpId" className="text-muted">Write the employee name</small>
                        </div>

                        <div class="form-group">
                            <label htmlFor="">Email:</label>
                            <input required type="text" className="form-control" onChange={this.valueChange} value={employee.email} name="email" id="email" aria-describedby="helpId" placeholder=""/>
                            <small id="helpId" className="text-muted">Write the employee email</small>
                        </div>

                        <div class="btn-group" role="group" aria-label="">
                            <button type="submit" className="btn btn-success">Update employee</button>
                            <Link to={"/"} className="btn btn-primary">Cancel</Link>
                        </div>
                    </form>
                </div>
                <div className="card-footer text-muted">
                   
                </div>
            </div> );
        }
    }
}
 
export default Edit;