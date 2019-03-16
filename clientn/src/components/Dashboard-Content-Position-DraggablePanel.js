import React,{ Component } from 'react';
import SolarPanel from '../image/sp.png';
import '../style/DraggablePanel.css';
import PanelDetail from './Dashboard-Content-Position-DraggablePanel-PanelDetail';
import PanelImage from './Dashboard-Content-Position-DraggablePanel-PanelImage';


class DraggablePanel extends Component{
    constructor(props){
        super(props);
        this.state={
            imagelist:[],
            panelNumber : 0, 
            rotation : 0,
            inclination: 0,
            mountType : null,
            ACPower : null,
        }
    }
    //deal with the drag x and y
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
                key:i
            });
        }
        this.setState({
          imagelist: imageArr  
        });
    }

    transeRotation(inputRotation){
        this.setState({
            rotation: inputRotation
        })
    }
    
    transeMountType(inputMountType){
        this.setState({
            mountType : inputMountType
        })
    }

    transeInclination(inputInclination){
        this.setState({
            inclination : inputInclination
        })
    }
    
    transeACPower(inputACPower){
        this.setState({
            ACPower : inputACPower
        })
    }

    imageOnClick(key, e){
        this.setState({
            panelNumber : key,
            rotation: window.localStorage.getItem(key + 'rotation'),
            inclination: window.localStorage.getItem(key + 'inclination'),
            mountType: window.localStorage.getItem( key +'mountType'),
            ACPower : window.localStorage.getItem( key + 'ACPower')
        })
    }
    //allow user to click number to chose panel
    numberOnClick(key){
        this.setState({
            panelNumber : key,
        })
    }

    componentDidUpdate(){
        // console.log("data update");
        // window.localStorage.setItem(this.state.panelNumber+"rotation",this.state.rotation);
        // window.localStorage.setItem(this.state.panelNumber+"inclination",this.state.inclination);
        // window.localStorage.setItem(this.state.panelNumber+"mountType",this.state.mountType);
    }

    renderImageList(){
        return(
        this.state.imagelist.map((imagelist) =>(
                <div className="eachPanel" key ={imagelist.key}>
                 { this.state.panelNumber === imagelist.key && 
                    <PanelDetail 
                        panelnumber={imagelist.key}
                        transeRotation={inputRotation => this.transeRotation(inputRotation)} 
                        transeInclination={ inputInclination => this.transeInclination(inputInclination)}
                        transeMountType={inputMountType => this.transeMountType(inputMountType)}
                        transeACPower={inputACPower => this.transeACPower(inputACPower)}
                    />
                }

                    <PanelImage 
                        imagelist ={imagelist} 
                        panelNumber = {this.state.panelNumber} 
                        imageOnClick={ key => this.imageOnClick(key)} 
                        panelRotation = {this.state.rotation}
                        panelInclination ={this.state.inclination}
                        panelMountType ={this.state.mountType}
                    />
                    <p className='underNumber' onClick={()=> this.numberOnClick(imagelist.key)} >
                    {this.state.panelNumber === imagelist.key ? <mark> {imagelist.key + 1 }</mark>:  imagelist.key + 1 }
                    </p>
                </div>
        )));
    }


    render(){
        return (
                <div className='PositionPanelSpace'>
                    {this.renderImageList()}
                </div>
        )
    }
}

export default DraggablePanel;