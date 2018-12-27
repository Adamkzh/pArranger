import React,{ Component } from 'react';
import { Message } from 'semantic-ui-react'
import html2canvas from 'html2canvas';
import DraggablePanel from '../components/DraggablePanel';
import '../style/Position.css';
import AWS from 'aws-sdk';
import Promise from 'promise';
import ReactGA from 'react-ga';

const s3 = new AWS.S3({
    region:'us-west-2',
    Bucket:'legionsolar-web-app'
});

class Position extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            warning : false,
            nullNumber : 0,
            uploading : false
        }
        this.isValidated = this.isValidated.bind(this);
    }


    isValidated(){
        var np = window.localStorage.getItem('watts');
        np = np /200;
        for( var i = 0 ; i < np; i++){
            if(window.localStorage.getItem(i + 'mountType') == null ){
                this.setState({
                    nullNumber : i + 1,
                    warning : true
                })
                return false;
            }
        }
        this.setState({
            uploading: true, 
        });

        return new Promise((resolve, reject) => {
            this.captureMap();
            setTimeout(() => {
              // call resolve() to indicate that server validation or other aync method was a success.
              // ... only then will it move to the next step. reject() will indicate a fail
              resolve();
              // reject(); // or reject
            }, 1000);
          });
      }
    

      captureMap(){
          return (html2canvas(document.querySelector(".capture")).then(canvas => {
            this.saveDataToS3(canvas.toDataURL());
          }));
      }

      saveDataToS3(file){
        const s3 = new AWS.S3({
          region:'us-west-2',
          Bucket:'legionsolar-web-app'
        });
      
        var params = {
          Bucket:'legionsolar-web-app',
          Key: 'PanelsMap/' + window.localStorage.getItem('uuid'),
          Body:file,
        };
      
        s3.upload(params, (err,data) =>{
            if(err){
            //   console.log('error !!! '+ JSON.stringify(err,null,2));
            }else{
            //   console.log('success!!!' + JSON.stringify(data,null,2))
            }
        })
      }

      draw(){
        const canvas = document.getElementById('mapImg');
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
            //     // console.log("data"+data);           // successful response
            //  }     
             if(data === null){
                return;
            }  
             img.src = data.Body;
        }); 
    }
    componentDidMount(){
        ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
        this.draw();
    }
    fireTracking() { 
        ReactGA.pageview('Position');
    }
    render(){
        this.fireTracking();
        return(
            <div className="system">
                <div className="_title">
                    POSITION
                </div>
                <div className='capture'>
                    <div className='ui two column grid'>
                        <canvas className="mapImg" id="mapImg" width="800" height = "410" > 
                        </canvas>
                        <div className="size_Input" style={{height:'fit-content'}} >
                            <DraggablePanel number={window.localStorage.getItem('watts')} />
                        </div>
                    </div>
                    {this.state.warning === true &&
                        <Message
                        className='positionWarning'
                        warning
                        header= 'Error!'
                        content={ 'Panel ' + this.state.nullNumber + ' mount type not selected yet.'}
                        />         
                    }     
                </div>
            </div>
        );
    }
}

export default Position;