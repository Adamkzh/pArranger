import React,{ PureComponent } from 'react';
import { Dropdown, Message } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import PanelNumber from './PanelNumber';
import '../style/System.css';
import AWS from 'aws-sdk';
import ReactGA from 'react-ga';

const s3 = new AWS.S3({
    region:'us-west-2',
    Bucket:'legionsolar-web-app'
});

const ACPower = [
    {
        key: '120VAC',
        text: '120VAC',
        value: '120VAC',
    },
    {
        key: '230VAC',
        text: '230VAC',
        value: '230VAC',
    },
]

class System extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            watts: window.localStorage.getItem('watts') === null ? 0 : window.localStorage.getItem('watts') ,
            price: window.localStorage.getItem('price') === null ? 0 : window.localStorage.getItem('price'),
            ACPower :  window.localStorage.getItem('ACPower') === null ? '120VAC' : window.localStorage.getItem('ACPower'),
            warning : false,
        }
        this.isValidated = this.isValidated.bind(this);
    }

    //for step validation
    isValidated(){
        if(this.state.watts <= 0){
            this.setState({
                warning : true
            })
            return false;
        }
        window.localStorage.setItem('ACPower',this.state.ACPower);
        return true;
    }

    setPrice(watts){
        return this.state.price;
    }
    
    setNumber(watts){
        var number = parseInt(watts,10);
        return number /200;
    }

    //number here is watts
    handleWattChange(number){
        var wattsNumber = parseInt(number,10);
        var realPrice;

        if(wattsNumber === 0){
            realPrice = 0;
        }else{
            this.setState({
                warning : false
            })
                realPrice = (wattsNumber/200 - 1) * 299 + 399
        }
        this.setState({
            watts : number,
            price : realPrice
        })
 
    }

    fireTracking() { 
        ReactGA.pageview('System Size');
    }

    componentDidMount(){
        this.draw();
        ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
    }

    componentDidUpdate(prevProps, prevState){
        window.localStorage.setItem('watts',this.state.watts);
        window.localStorage.setItem('price',this.state.price);
    }

    draw(){
        const canvas = document.getElementById('mapPic');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, 0, 0, 800, 390);
        }
        var params = {
            Bucket: "legionsolar-web-app", 
            Key: 'OriginalMap/' + window.localStorage.getItem('uuid'),
           };
        s3.getObject(params, function(err, data) {
            //  if (err) 
            //     // console.log(err, err.stack); // an error occurred
            //  else{
            //     // console.log('save success!');           // successful response
            //  } 
            if(data === null){
                return;
            }   
             img.src = data.Body;
        }); 
    }

    ACPowerChange(event,data){
        this.setState({
            ACPower : data.value
        })
        window.localStorage.setItem("ACPower",data.value);
    }

 
    render(){
        function myFormat(num){
            return num + ' watts'
        }
        this.fireTracking();
        return(
            <div className="system">
                <div className="_title">
                    SYSTEM SIZE
                </div>
                <div className='ui two column grid'>
                    <canvas className="mapPic" id="mapPic" width="800" height = "410" > 
                    </canvas>
                    <div className='size_Input' >
                        <div className='system_SizeInput'>
                            Select your system size 
                        </div>
                        <NumericInput
                            className='number_control'
                            strict={true}
                            value={this.state.watts}
                            min={0}
                            max={6400}
                            size={9}
                            step={200}
                            mobile={false}
                            format={myFormat}
                            onChange={valueAsNumber => this.handleWattChange(valueAsNumber)}
                            />
                        <br></br>
                        <div className='system_SizeInput'>
                            Select your AC power
                        <br></br>
                        <Dropdown 
                            className='acPower'
                            placeholder='Chose your AC power'  
                            selection options={ACPower}
                            value={this.state.ACPower}
                            onChange ={(e,data) => this.ACPowerChange(e,data)}
                        />
                        </div>
                        <div className='systemprice'>
                            System Price: $ { this.state.price}
                        </div> 
                        <PanelNumber number={this.state.watts} />
                        <div className='tips'>
                            * System price includes solar panels, micro-inverters, wire harnesses. Does not yet include mounting hardware.
                        </div>
                    </div>
                </div>  
                {this.state.warning === true &&
                    <Message
                    className='systemWarning'
                    warning
                    header='Error!'
                    content='System size must be greater than 0.'
                />         
                }     
            </div>
        );
    }
}

export default System;