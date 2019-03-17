import React, { Component } from 'react';
import '../style/Dashboard.css';
import Header from './Header';
import DashboardContent from'./Dashboard-Content';

class Dashboard extends Component{
    render(){
        return(
            <div>
                <Header activeTag={"dashboard"}/>
                <DashboardContent />
            </div>
        );
    }
}

export default Dashboard;   