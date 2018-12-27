import React,{ Component } from 'react';
import Draggable from 'react-draggable'; 



class PanelImage extends Component {

    constructor(props){
        super(props);
        this.state={
            inclination: this.props.panelInclination,
            length : 21 * Math.cos(this.props.panelInclination * Math.PI / 180),
            rotation: 0,
            mountType : this.props.panelMountType,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.panelNumber === nextProps.imagelist.key){
            this.setState({
                length : 21 * Math.cos(nextProps.panelInclination * Math.PI / 180 ),
                rotation : nextProps.panelRotation,
                mountType : nextProps.panelMountType,
            })
        }
    }

    click = () =>  {
        this.props.imageOnClick(this.props.imagelist.key);
    }
    
    render (){
        var panelStyle = {
            height: this.state.length +'px' ,
            transform: "rotate(" + this.state.rotation + "deg)",
        };
            return(
            <Draggable
                onMouseDown={e => {
                e.preventDefault();
                }}
                grid={[2,2]}
            >
                <div className='dragPanelImage' >                
                   
                        <img 
                            src={this.props.imagelist.src} 
                            draggable={false}
                            style={panelStyle} 
                            width={'16px'}
                            height={'20px'}
                            margin={'50px'}
                            alt= {this.props.imagelist.key} 
                            key ={this.props.imagelist.key} 
                            onClick={this.click}
                        />
                    
                 </div>
            </Draggable>
            )
        }
    }

export default PanelImage;