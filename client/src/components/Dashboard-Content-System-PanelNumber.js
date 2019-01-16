import React,{ Component } from 'react';
import SolarPanel from '../image/sp.png';
import '../style/PanelNumber.css';

class PanelNumber extends Component{
    constructor(props){
        super(props);
        this.state={
            imagelist:[],
        }
    }
    componentWillReceiveProps(nextProp) {
        if (this.props.number !== nextProp.number) {
             var realNumber = nextProp.number;
             realNumber = realNumber / 200;
            this.loadImage(realNumber);
        }
    }

    componentDidMount(){
        var realNumber = this.props.number / 200;
        this.loadImage(realNumber);
    }

    loadImage(realNumber){
        var imageArr = [];
        for(let i = 0; i < realNumber; i++){
            imageArr.push( {
                src:SolarPanel,
                mediaId:'0',
                key:i
            });
        }
        this.setState({
          imagelist: imageArr  
        });
    }


    renderImageList(imagelist){
        return(
            imagelist.map((imagelist) =>(
                <img src={imagelist.src} className='panelImage' alt= {imagelist.mediaId} key ={imagelist.key}/>
            ))
        );
    }

    render(){

        return (
            <div className='panelSpace'>
                {this.renderImageList(this.state.imagelist)}
            </div>
        )
    }
}

export default PanelNumber;