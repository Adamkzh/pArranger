import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import {
  Button,
} from 'semantic-ui-react';


class Dashboard extends Component{

constructor(props){
    super(props);
    this.state = {
        address: window.localStorage.getItem('address'),
        uuid: window.localStorage.getItem('uuid'),
        username: " ",
        email: " ",
        watts: window.localStorage.getItem('watts'),
        mountType: window.localStorage.getItem('0mountType'),
        image:''
    }
}



componentDidMount= ()=> {
  // fetch current user data from server
  var id = this.props.match.params.id;
  if(id !== "admin"){  
    const getUserByIDUrl = '/api/v1/getUser?id=' + id;
    axios.get(getUserByIDUrl)
      .then((response) =>{
        console.log("[Response] from server: ");
        console.log(response);
        if (response.data.success) {
            const data = response.data.result;
            this.setState({
                address: data.address,
                uuid: data._id,
                username: data.username,
                email: data.email,
                watts: data.watts,
                mountType: data.mountType,
                image:data.mapImage,
            });

        } else {
            console.log(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });  
    }
}

editButtonClick = ()=>{
    window.location = '/design';
    window.localStorage.setItem('step', 3);
}


render(){

    return(
        <div>
            <Header activeTag={"dashboard"}/>
            <Button inverted color='green' onClick={this.editButtonClick}>Edit</Button>
        </div>
    );
}
}

export default Dashboard;   