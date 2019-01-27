import React, { Component } from 'react';
import Header from '../Header';
import AdminContent from './Admin-Content';

class AdminDashboard extends Component{
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