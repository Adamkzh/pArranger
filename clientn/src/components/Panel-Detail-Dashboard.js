import React, { Component } from 'react';
import Header from './Header';

class Dashboard extends Component{

    render(){
        return(
            <div>
                <Header activeTag={"dashboard"}/>
                {this.props.match.params.id}
            </div>
        );
    }
}

export default Dashboard;   