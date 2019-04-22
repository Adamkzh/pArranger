import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {
    Dropdown,
    Container,
    Header,
    Menu,
    Segment,
    Input,
    Card,
} from 'semantic-ui-react';

import Detail from './Detail'
import '../../style/Search.css'


class Search extends Component {

    constructor(props) {
        super(props);
        var adminStatus;
        if(window.localStorage.getItem('admin')=== "false"){
          adminStatus = false;
        }else{
          adminStatus = true;
        }
        this.state = {
          admin: adminStatus,
          item: [],
          viewDetail: false,
          curId: ""
      }
    }

    componentDidMount = () => {
        var id = this.props.match.params.id;
        if (id !== "admin") {
            const getUsersUrl = "/api/v1/getUsers" ;
            axios.get(getUsersUrl).then(response => {
                const data = response.data.result.data;
                if (data) {
                    let allUsers = [];
                    data.forEach(element => {
                        let obj = {};
                        obj.header = element.username;
                        obj.meta = element.watts + " W";
                        obj.image = element.mapImage;
                        obj.description = element.address;
                        obj.link = true;
                        obj.raised = true;
                        obj.onClick = this.nailClick;
                        obj.id = element._id;
                        allUsers.push(obj);
                    });
                    this.setState({
                        viewDetail: false,
                        item: allUsers
                    });
                }
            }).catch(error => {console.log(error);});
        }
    };

nailClick = (element, data)=>{
  var id = data.id;
  this.setState({
    curId : id,
    viewDetail: true
  })
}

backClick= () =>{
  this.setState({
    viewDetail: false
  })
}

 /**
     * Handle keyPress event.
     * Call backend server when 'Enter' key is pressed.
     */
  handleInputChange = (event) => {
      const value = event.target.value;
      if (value) {
          const searchUsersUrl = "/api/v1/searchUsers?q=" + value +'&limit=20';
          axios.get(searchUsersUrl).then(response => {
              const data = response.data.result.data;
              if (data) {
                  const searchResultUsers = [];
                  data.forEach(element => {
                      let obj = {};
                      obj.header = element.username;
                      obj.meta = element.watts + " W";
                      obj.image = element.mapImage;
                      obj.description = element.address;
                      obj.link = true;
                      obj.raised = true;
                      obj.onClick = this.nailClick;
                      obj.id = element._id;
                      searchResultUsers.push(obj);
                  });
                  this.setState({
                      viewDetail: false,
                      item: searchResultUsers
                  });
              }
          }).catch(error => {console.log(error);});
      }
  };


render(){
  var idLink = "/";
  var temp = this.state.admin ? "Admin" : "User";
  var hello = "Hello, "+ temp;

  if(window.localStorage.getItem('uuid') !== null){
    idLink = "/dashboard/" + window.localStorage.getItem('uuid');
  }
  let content;
  if(this.state.admin){
    content = <Container>
    <Menu.Item as={Link} to='/' active>HOME</Menu.Item>
    <Menu.Item as={Link} to='/search' >SEARCH</Menu.Item>
    <Menu.Item as={Link} to= '/console'>DASHBOARD</Menu.Item>
  </Container>
  }else{
    content = <Container>
    <Menu.Item as={Link} to='/' active>HOME</Menu.Item>
    <Menu.Item as={Link} to='/design'>DESIGN</Menu.Item>
    <Menu.Item as={Link} to= {idLink}>DASHBOARD</Menu.Item>
  </Container>
  }

  return(
        <div>
          <Segment
            inverted
            textAlign='center'
            style={{ 
              minHeight: 350, 
              padding: '1em 0em',
              'backgroundImage': 'url(https://earthview.withgoogle.com/download/6101.jpg)',
              'backgroundRepeat': 'no-repeat',
              'backgroundSize': 'cover',
            }}
            vertical
          >
            <Menu
              inverted
              pointing
              secondary
              size='large'
              style={{ 
                'borderWidth': '0px'
              }}
            >
            {content}
                <Menu.Item 
                  style={{
                    "marginRight" : '25px'
                  }} > 
                  <Dropdown text={hello}>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      icon="user" text={this.state.admin ? "User Login" : "Admin Login"} 
                      onClick={()=>{
                        this.setState({
                          admin: !this.state.admin
                        })
                        window.localStorage.setItem('admin', !this.state.admin);
                        }}
                    />
                  </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
            </Menu>

            <Container text>
                <Header
                as='h2'
                content='Search'
                inverted
                style={{
                    fontSize:'4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '1em',
                }}
                />
                <Input icon='search' placeholder='Search'
                        style={{
                            marginTop: '1em',
                            width: '39em'
                        }}
                        onChange={this.handleInputChange}
                />
            </Container>
          </Segment>

          {this.state.viewDetail ?  
          <Detail id={this.state.curId} backFunc={this.backClick}/> :       
          <Card.Group 
          itemsPerRow={5}
          centered
          className= "searchSeg" 
          items={this.state.item}
          >
          </Card.Group>}
        </div>
    );
}
}

export default Search;   