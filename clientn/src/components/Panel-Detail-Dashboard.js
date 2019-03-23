import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';




class Dashboard extends Component{

componentDidMount(){
    var id = this.props.match.params.id;
    if(id !== "admin"){
        axios.get('/api/get',{
            params:{
                id: id
            }
        })
        .then(function (response) {
           console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

}

    render(){
        return(
            <div>
                <Header activeTag={"dashboard"}/>
            </div>
        );
    }
}

export default Dashboard;   