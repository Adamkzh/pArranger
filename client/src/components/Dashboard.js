import React, { Component } from 'react';
import '../style/Dashboard.css';
import Header from './Header';
import Content from'./Content';

class Dashboard extends Component{
    render(){
        return(
            <div>
                {/* <Header /> */}
                <Content />
            </div>
        );
    }
}

export default Dashboard;   