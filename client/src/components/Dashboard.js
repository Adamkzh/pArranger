import React, { Component } from 'react';
import '../style/Dashboard.css';
import Header from './Header';
import Content from'./Content';
import Footer from './Footer';

class Dashboard extends Component{
    render(){
        return(
            <div>
                <Header />
                <Content />
                <Footer />
            </div>
        );
    }
}

export default Dashboard;   