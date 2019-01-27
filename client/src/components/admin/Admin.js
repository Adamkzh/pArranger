import React, { Component } from 'react';
import Header from '../Header';
import AdminContent from './Admin-Content';

class AdminDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined
        }
    }
    render(){
        return(
            <div>
                <Header />
                <AdminContent />
            </div>
        );
    }
}

export default AdminDashboard;   