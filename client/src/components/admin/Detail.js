import React, { Component } from 'react';
import { Icon, Image, Grid, Container, Segment, Button} from 'semantic-ui-react';
import '../../style/admin/Detail.css';
import axios from 'axios';

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: "",
            uuid: "",
            username: "",
            email: "",
            watts: "",
            mountType: "",
            image:'',
        }
    }

    componentDidMount = () =>{
        console.log(this.props.id);
        axios.get('/api/get', {
            params: {
              ID: this.props.id
            }
          })
          .then((response) =>{
            console.log(response)
            var data = response.data;
            this.setState({
                address: data.address,
                uuid: data._id,
                username: data.username,
                email: data.email,
                watts: data.watts,
                mountType: data.mountType,
                image:data.mapImage,
            })
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });  
    }
    
    deleteOnlick = ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post('/api/v1/removeUser', {
            _id: this.state.uuid
        }, config)
        .then(function (response) {
            console.log(response);
          if(response.request.status === 200){

          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render(){
        return(
            
        <Container style={{ margin: 5 }}>
        <Grid>
            <Grid.Row >
                <Grid.Column>
                    <Icon className="iconH" name='arrow left' size='big' onClick={this.props.backFunc} />
                    <Icon className="deleteButton iconH" name='trash alternate' size='big' float='right' onClick={this.deleteOnlick} />
                </Grid.Column>
            </Grid.Row>
        </Grid>

        <Grid>
            <Grid.Row>
            <Image src={this.state.image} centered/>
            </Grid.Row>
            <Grid.Row columns={4}>
            <Grid.Column>
                <Segment raised>
                    <span>Mount Type</span>
                    <p>
                    {this.state.mountType}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <span>Panel Power</span>
                    <p>
                    {this.state.watts}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <span>Address</span>
                    <p>
                    {this.state.address}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <span>User</span>
                    <p>
                    {this.state.username}
                    </p>
                </Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>

        );
    }
}

export default Detail;   