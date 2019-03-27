import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Header,
    Menu,
    Segment,
    Input,
    Card,
    Image,
    Icon,
} from 'semantic-ui-react';

import '../style/Search.css';





class Search extends Component{

constructor(props){
    super(props);
    this.state = {
        item: []
    }
}


componentDidMount= ()=> {
    var id = this.props.match.params.id;
    if(id !== "admin"){
        axios.get('/api/getall', {
            params: {
              ID: id
            }
          })
          .then((response) =>{
              var data = response.data;
              data.forEach(element => {
                  var obj = {};
                  obj.header = element.username;
                  obj.meta = element.email;  
                  obj.image = element.mapImage;
                  console.log(obj)
                  this.setState({
                    item:[...this.state.item, obj]
                  });
                });

          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    }
}



render(){
    var src = 'https://image.ibb.co/kzeSqw/lunch1.jpg'
    var dashboardUrl = "/dashboard/";
    if(window.localStorage.getItem('uuid')){
      dashboardUrl += window.localStorage.getItem('uuid');
    }else{
      dashboardUrl += "admin"
    }

    console.log(this.state.item)
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
              <Container>
                <Menu.Item as={Link} to='/' >HOME</Menu.Item>
                <Menu.Item as={Link} to='/design'>DESIGN</Menu.Item>
                <Menu.Item as={Link} to= {dashboardUrl}>DASHBOARD</Menu.Item>
                <Menu.Item as={Link} to='/search' active>SEARCH</Menu.Item>
                <Menu.Item as={Link} to= '/console'>CONSOLE</Menu.Item>
                <Menu.Item position='right'>
                  <Button as={Link} to='/login' inverted>
                    SIGN IN
                  </Button>
                </Menu.Item>
              </Container>
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
            <Input icon='search' placeholder='Search...' 
                style={{
                    marginTop: '1em',
                    width: '26em'
                }}
            />
            </Container>
          </Segment>

            <Card.Group 
            itemsPerRow={5}
            centered
            className= "searchSeg" 
            items={this.state.item}
            >
            </Card.Group>
        </div>
    );
}
}

export default Search;   