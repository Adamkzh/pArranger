import React, { Component } from 'react'
import '../style/Detail.css';
import { Button, Form, Grid, Input, Dropdown } from "semantic-ui-react";

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


class Detail extends Component {

    constructor(props,context){
        super(props);
        this.state={
            sx:-154,
            sy:0,
            width:1461,
            height:440,
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
        const canvas = document.getElementById('realMapImg');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, this.state.sx, this.state.sy, this.state.width, this.state.height);
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
    
    render(){
        return (
            <div>
                <div className='_title'>
                        Detail
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
                                        <input id="uuid" value={this.state.uuid} onChange={this.handleChange}/>
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
                                        <Button type="submit">Submit</Button>
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