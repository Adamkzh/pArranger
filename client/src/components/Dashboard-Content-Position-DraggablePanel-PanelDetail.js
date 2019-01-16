import React,{ Component } from 'react';
import {Input ,Dropdown} from 'semantic-ui-react';
import '../style/DraggablePanel.css';

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

class PanelDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            panelnumber : this.props.panelnumber,
            rotation: window.localStorage.getItem(this.props.panelnumber+'rotation') ? window.localStorage.getItem(this.props.panelnumber+'rotation') : 0,
            inclination: window.localStorage.getItem(this.props.panelnumber+'inclination') ? window.localStorage.getItem(this.props.panelnumber+'inclination') : 0,
            mountType: window.localStorage.getItem(this.props.panelnumber+'mountType') ? window.localStorage.getItem(this.props.panelnumber+'mountType') : null,
        }
        this.RotationChange = this.RotationChange.bind(this);
        this.InclinationChange = this.InclinationChange.bind(this);
        this.MountChange = this.MountChange.bind(this);
    }

    componentDidMount(){
        if(window.localStorage.getItem(this.props.panelnumber+"ACPower") === null){
            window.localStorage.setItem(this.props.panelnumber+"ACPower",'120VAC');
        }
    }

    RotationChange(rotationData){
        this.setState({
            rotation : rotationData
        })
        window.localStorage.setItem(this.props.panelnumber+"rotation",rotationData);
        this.props.transeRotation(rotationData);
    }
    InclinationChange(inclinationData){
        this.setState({
            inclination : inclinationData
        })
        window.localStorage.setItem(this.props.panelnumber+"inclination",inclinationData);
        this.props.transeInclination(inclinationData);
    }

    MountChange(event,data){
        this.setState({
            mountType: data.value
        })
        window.localStorage.setItem(this.props.panelnumber+"mountType",data.value);
       this.props.transeMountType(data.value);
    };


    render (){
            return(
                <div className='inputArea'>
                    <div className='head'>① Click the panel you want to set </div>
                    <br></br>
                    <div className='head'>② Setting panel <mark>{this.props.panelnumber + 1} </mark> attributes</div>
                    <div className='header'>Rotation</div>
                    <Input
                        size='mini'
                        type='text'
                        label={{ basic: true, content: '°' }}
                        labelPosition='right'
                        placeholder='Enter degree'
                        value={this.state.rotation}
                        onChange={e => this.RotationChange(e.target.value)}
                    />
                    <div className='header'>Inclination</div>
                    <Input
                        label={{ basic: true, content: '°' }}
                        labelPosition='right'
                        placeholder='Enter degree'
                        value={this.state.inclination}
                        size='mini'
                        onChange={e => this.InclinationChange(e.target.value)}
                    />
                    <div className='header'>Mount Type</div>
                    <div className='dropdown'>
                        <Dropdown 
                            placeholder='Chose your mount type'  
                            selection options={mountOptions}
                            value={this.state.mountType}
                            onChange ={(e,data) => this.MountChange(e,data)}
                        />
                    </div>
                    <div className='Dragger'>
                    ③ Drag to Place Panels Into Position 
                    </div>
                </div>
            )
        }
    }

export default PanelDetail;