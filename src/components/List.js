import React from 'react';
import { Link } from "react-router-dom";
import Api from "../services/api";

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loadedData:false,
            employees:[] 
        }
    }

    deleteLog = (id) =>{
        
        fetch(Api+"?delete="+id)
        .then(response=>response.json())
        .then((responseData)=>{
            console.log(responseData);
            this.loadData();
        })
        .catch(console.log)
        
    }

    loadData(){
        fetch(Api)
        .then(response=>response.json())
        .then((responseData)=>{
            console.log(responseData);
            this.setState({ loadedData:true, employees:responseData })
        })
        .catch(console.log)
    }

    componentDidMount(){
        this.loadData();
    }

    render() { 
        const{loadedData, employees}=this.state

        if(!loadedData) { return(<div>Loading...</div>); }
        else {
            return ( 
            <div className="card">
                <div className="card-header">
                    <Link className="btn btn-success" to={"/create"}>Add new employee</Link>
                </div>
                <div className="card-body">
                    <h4>Employees list</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                employees.map(
                                    (employee)=>(
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="">
                                                    <Link className="btn btn-warning" to={"/edit/"+employee.id}>Edit</Link>
                                                    <button type="button" className="btn btn-danger" onClick = {() => this.deleteLog(employee.id)}>Delete</button>
                                                </div>
                                            </td>
                                        </tr>  
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer text-muted">
                    
                </div>
            </div>
            );
        }
    }
}
 
export default List;