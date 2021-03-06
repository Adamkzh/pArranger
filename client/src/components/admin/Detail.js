import React, { Component } from 'react';
import { Icon, Image, Grid, Container, Segment, Confirm, Header, Label} from 'semantic-ui-react';
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
            open: false,
            deleted: false,
        }
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        if (this.state.deleted) {
            window.location = '/search';
        }
    };

    componentDidMount = () => {
        const getUserByIDUrl = '/api/v1/getUser?id=' + this.props.id;
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
                    open: false,
                });

            } else {
                console.log(response.data.error);
            }
          })
          .catch(function (error) {
            console.log(error);
          })
    }
    
    deleteOnlick = ()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios.post('/api/v1/removeUser', {
            removeUser: { _id: this.state.uuid }
        }, config)
        .then((response)=> {
            console.log(response);
            if (response.data.success) {
                console.log("[Success] Item deleted.");
                this.setState({open: true, deleted: true});

            } else {
                console.log(response.data.error);
            }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

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
            <Container textAlign='center'><Header as='h4'>ID: {this.state.uuid}</Header> </Container>
            <Grid.Row columns={4}>
            <Grid.Column>
                <Segment raised>
                    <Label attached='top'>Mount Type</Label>
                    <p>
                    {this.state.mountType}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label attached='top'>Panel Power</Label>
                    <p>
                    {this.state.watts}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label attached='top'>Address</Label>
                    <p>
                    {this.state.address}
                    </p>
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment raised>
                    <Label attached='top'>User</Label>
                    <p>
                    {this.state.username}
                    </p>
                </Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid>
            <Confirm
                open={this.state.open}
                content="Deletion succeeded."
                style={{ left: '25%', top: '25%' }}
                onConfirm={this.handleClose}>
            </Confirm>
        </Grid>
        </Container>
        );
    }
}

export default Detail;   