import React, { Component } from 'react'
import '../style/Detail.css';
import { Button, Form, Grid, Input, Dropdown } from "semantic-ui-react";
import axios from 'axios';

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
const height = 370;

var crop_image;

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
        })
    }

    draw(){
        var canvas = document.getElementById('realMapImg');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, sx, sy, width, height);
            crop_image =  canvas.toDataURL();
        }
        img.src = window.localStorage.getItem('new_image');
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
        var imageurl = crop_image;
        const formData = new FormData();
        formData.append('mapImage',imageurl);
        formData.append('data',JSON.stringify(this.state))
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        axios.post('/api/save', formData, config)
          .then(function (response) {
            if(response.request.status === 200){
                window.location = '/dashboard/' + window.localStorage.getItem('uuid');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      };
    
    render = () =>{
        return (
            <div>
                <div className='_title'>
                        Save/Edit
                </div>
                        <Grid divided='vertically'>
                            <Grid.Row columns={2}>
                            <Grid.Column>
                                <canvas className="FinalMapImg" id="realMapImg" width="800" height = "410" > </canvas>
                            </Grid.Column>
                            <Grid.Column>
                                <div className='rightP'>
                                    <Form>
                                        <Form.Field>
                                        <label>Address</label>
                                        <input id="address" value={this.state.address} onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>UUID</label>
                                        <input id="uuid" value={this.state.uuid} readOnly/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>User Name</label>
                                        <input id="username"value={this.state.username}  placeholder="Tom Marvolo Riddle"  onChange={this.handleChange}/>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Email</label>
                                        <input id="email" value={this.state.email} placeholder="cmpe280@sjsu.edu"  onChange={this.handleChange}/>
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
                                        <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                                    </Form>
                                </div>
                            </Grid.Column>
                            </Grid.Row>

                        </Grid>
                </div>
        )
    }
}

export default Detail;