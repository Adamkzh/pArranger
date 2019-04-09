import React, { Component } from 'react';
import Header from './Header';
import axios from 'axios';
import { Image, Grid, Container, Segment, Button, Label, Modal, Icon } from 'semantic-ui-react';

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
        image:'',
        modalOpen: false,
        apidata: null,
    }
}



componentDidMount= ()=> {
  // fetch current user data from server
  var id = this.props.match.params.id;
  if(id !== "admin"){  
    const getUserByIDUrl = '/api/v1/getUser?id=' + id;
    axios.get(getUserByIDUrl)
      .then((response) =>{
        const data = response.data.result;
        if (data) {
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
            this.setState({
                modalOpen: true
            })
            console.log(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      }); 
            
    //   https://api.solcast.com.au/radiation/forecasts?Longitude=119.117&Latitude=-35.277&format=json
    //   https://solcast.com.au/solar-data-api/api/
    
      console.log("not work due to CROSS RIGION, SHOULD FETCH FROM BACKEND")
      var solarApi = 'https://api.solcast.com.au/radiation/forecasts?Longitude=119.117&Latitude=-35.277&api_key=PqoGuGkg3plkD4Wi1uGSfAVigAM2Bbht&format=json'
      axios.get(solarApi)
      .then((response) =>{
        console.log("[Response] from solar API: ");
        console.log(response);
        if (response.data.success) {
            const data = response.data.result;
            this.setState({
                apidata: data
            });
        } else {
            console.log(response.data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
    }
}

editButtonClick = ()=>{
    window.location = '/design';
    window.localStorage.setItem('step', 3);
}

handleOpen = () => this.setState({ modalOpen: true })

handleClose = () => this.setState({ modalOpen: false })

noDataErr = () => {
    window.localStorage.setItem('step', 0);
    window.location = '/design'
}


render(){

    return(
        <div>
            <Header activeTag={"dashboard"}/>
            <Container style={{ margin: 5 }}>
            <Button inverted color='green'  onClick={this.editButtonClick}>Edit</Button>
            <Grid>
                <Grid.Row>
                <Image src={this.state.image} centered/>
                </Grid.Row>
                <Grid.Row columns={4}>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='blue' ribbon>
                        Mount Type
                        </Label>
                        <p>
                        {this.state.mountType}
                        </p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='red' ribbon>
                        Panel Power
                        </Label>
                        <p>
                        {this.state.watts}
                        </p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='orange' ribbon>
                        Address
                        </Label>
                        <p>
                        {this.state.address}
                        </p>
                    </Segment>
                </Grid.Column>
                <Grid.Column>
                    <Segment raised>
                        <Label as='a' color='teal' ribbon>
                        User
                        </Label>
                        <p>
                        {this.state.username}
                        </p>
                    </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            <Grid>
            </Grid>
            {this.state.modalOpen && 
            <div>
            <Modal
                open={this.state.modalOpen}
                onClose={this.noDataErr}
                basic
                size='small'
                style={{ left: '25%', top: '25%' }}
            >
                <Modal.Content>
                <h3>No data found! Please construct your panel first.</h3>
                </Modal.Content>
                <Modal.Actions>
                <Button color='green' onClick={this.noDataErr} inverted>
                    <Icon name='checkmark' /> Got it
                </Button>
                </Modal.Actions>
            </Modal>
            </div>
            }
            <div>
                {this.state.apidata}
            </div>
            </Container>
        </div>
    );
}
}

export default Dashboard;   