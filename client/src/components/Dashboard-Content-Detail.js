import React, { Component } from 'react'
import { Button, Form, Grid, Input, Dropdown, Container } from "semantic-ui-react";
import '../style/Detail.css';
import axios from 'axios';
// import b64toBlob from 'b64-to-blob'

import CSImage from '../image/cs-roof.jpg'
import tileImage from '../image/tile-roof.png'
import metalImage from '../image/metal-roof.png'
import DIYImage from '../image/diy-roof.png'


const mountOptions = [
    {
        key: 'Composite Shingle',
        text: 'Composite Shingle',
        value: 'Composite Shingle',
        image: { avatar: true, src: CSImage },
    },
    {
        key: 'Tile',
        text: 'Tile',
        value: 'Tile',
        image: { avatar: true, src: tileImage },
    },
    {
        key: 'Metal',
        text: 'Metal',
        value: 'Metal',
        image: { avatar: true, src: metalImage },
    },
    {
        key: 'DIY',
        text: 'DIY',
        value: 'DIY',
        image: { avatar: true, src: DIYImage },
    },
];

const sx = -154;
const sy = 0;
const width = 1461;
const height = 420;

var crop_image;
var title = " ";
var buttonContent = " ";
var banModifyEmail = false;

class Detail extends Component {

    constructor(props,context){
        super(props);
        this.state={
            address:"",
            uuid:'',
            username:'',
            email:'',
            watts:'',
            mountType:'',
        }
    }
    
    componentDidMount(){
        this.draw();
        this.setState({
            address: window.localStorage.getItem('address'),
            uuid: window.localStorage.getItem('uuid'),
            username: " ",
            email: " ",
            watts: window.localStorage.getItem('watts'),
            mountType: window.localStorage.getItem('0mountType'),
        });
        
        if(window.localStorage.getItem('uuid') !== null){
            title = "Edit";
            buttonContent = "Update";
            banModifyEmail = true;

            var id = window.localStorage.getItem('uuid');
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
        }else{
            title = "Save";
            buttonContent = "Save";
            banModifyEmail = false;
            this.setState({
                address: window.localStorage.getItem('address'),
                uuid: window.localStorage.getItem('uuid'),
                username: " ",
                email: " ",
                watts: window.localStorage.getItem('watts'),
                mountType: window.localStorage.getItem('0mountType'),
            });
        }
    }

    draw(){
        var canvas = document.getElementById('realMapImg');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, sx, sy, width, height);
            crop_image =  canvas.toDataURL();
        }
        axios.get('/api/get', {
            params: {
              ID: "placed_image"
            }
        }).then((response) =>{
            img.src = 'data:image/png;base64,' + response.data;
        })
    }  

    isValidated(){
        return true;
    }

    handleChange = (e) =>{
        var value = e.target.value;
        this.setState({
          [e.target.id] : value
        })
    }

    MountChange(event,data){
        this.setState({
            mountType: data.value
        })
    };


    handleSubmit = () => {
        // var b64Data = crop_image.replace(/^data:image\/(png|jpg);base64,/, "");
        // var contentType = 'image/png';
        // var blob = b64toBlob(b64Data, contentType);

        // const formData = new FormData();
        // formData.set('mapImage',blob);
        // formData.set('data',JSON.stringify(this.state));
        // formData.set('location', {lat: window.localStorage.getItem('lat'), 
        //                         lon: window.localStorage.getItem('lon')});
        // formData.set('acPower', 120);

 
        console.log('save......');
        var location = {lat: window.localStorage.getItem('lat'), lon: window.localStorage.getItem('lon')}
        var imageurl = crop_image;
        const jsonData = {...this.state};
        // jsonData['mapImage'] = imageurl;
        jsonData['mapImage'] = "https://www.androidpolice.com/wp-content/themes/ap2/ap_resize/ap_resize.php?src=https%3A%2F%2Fwww.androidpolice.com%2Fwp-content%2Fuploads%2F2018%2F03%2Fnexus2cee_goo-dot-gl.png&w=728";
        
        jsonData['location'] = location;
        jsonData['acPower'] = 120;

        var userData = {user: jsonData};
        var config = {headers: {"content-type": "application/json"}};

        // call edit api
        // if(window.localStorage.getItem('uuid') !== null){
        //     jsonData['_id'] = window.localStorage.getItem('uuid');
        //     var updateUser = {updateUser: jsonData};
        //     axios.post('/api/v1/updateUser', updateUser, config)
        //     .then(function (response) {
        //         console.log("[UpdateUser] Response from server below\n");
        //         console.log(response.data);
        //         if (response.data.success) {
        //             const userID = response.data.result.updated._id;
        //             window.localStorage.setItem('uuid', userID);
        //             window.location = '/dashboard/' + window.localStorage.getItem('uuid');
        //         } else {
        //             console.log(response.data.error);
        //         }
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        // // call save api
        // }else{
            console.log(JSON.stringify(userData)) 
            axios.post('/api/v1/addUser', userData, config)
            .then(function (response) {
                console.log("Response from server below\n");
                console.log(response.data);
                if (response.data.success) {
                    const userID = response.data.result.added._id;
                    window.localStorage.setItem('uuid', userID);
                    window.location = '/dashboard/' + window.localStorage.getItem('uuid');
                } else {
                    console.log(response.data.error);
                }
            })
            .catch(function (error) {
              console.log(error);
            });
        // }

    //     try{
    //         const config = {	
    //           headers: {	        
    //             'content-type': 'multipart/form-data'	      
    //           },
    //         };
        
    //         axios.post('/api/v1/addUser', formData, config).then(function (response) {
    //           console.log(response);
    //         })
    //       }catch(error){
    //         console.log(error)
    //       }

      };
    
    render = () =>{
        return (
            <Container style={{ margin: 5 }}>
                <div className='_title'>
                        {title}
                </div>
                        <Grid centered columns={1}>
                            <Grid.Column>
                                <canvas className="FinalMapImg" id="realMapImg" width="800" height = "410" > </canvas>
                            </Grid.Column>
                            <Grid.Row centered >
                                <Grid.Column>
                                <Form>
                                        <Form.Field>
                                        <label>Address</label>
                                        <input id="address" value={this.state.address} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>User Name</label>
                                        <input id="username"value={this.state.username}  placeholder="Tom Marvolo Riddle"  onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                        {!banModifyEmail? <label>Email</label>: <label>Email (Update cannot modify email)</label>}
                                        <input id="email" readOnly={banModifyEmail} value={this.state.email} placeholder="cmpe280@sjsu.edu"  onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Panel Power</label>
                                        <Input
                                            label={{ basic: true, content: 'w' }}
                                            labelPosition='right'
                                            placeholder='Enter solar power'
                                            id="watts" 
                                            value={this.state.watts} 
                                            onChange={this.handleChange}
                                        />
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Panel Type</label>
                                        <Dropdown 
                                            placeholder='Chose your mount type'  
                                            selection options={mountOptions}
                                            value={this.state.mountType}
                                            onChange ={(e,data) => this.MountChange(e,data)}
                                        />
                                        </Form.Field>
                                        <Button id='submitB'type="submit" inverted floated='right' color='orange' size='massive' onClick={this.handleSubmit}>{buttonContent}</Button>
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                </Container>
        )
    }
}

export default Detail;