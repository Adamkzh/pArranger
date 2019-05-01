import React,{ Component } from 'react';
import { Message } from 'semantic-ui-react'
import html2canvas from 'html2canvas';
import DraggablePanel from './Dashboard-Content-Position-DraggablePanel';
import '../style/Position.css';
import Promise from 'promise';
import axios from 'axios';
import b64toBlob from 'b64-to-blob';


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
            // call resolve() to indicate that server validation or other aync method was a success.
            // ... only then will it move to the next step. reject() will indicate a fail
            html2canvas(document.querySelector(".capture")).then(canvas => {
                var formData  = new FormData();
                // set id to placed image
                formData.set('id','placed_image');
                var contentType = 'image/png';
                var b64Data = canvas.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "");
                var blob = b64toBlob(b64Data, contentType);
    
                // set mapimage
                formData.set('mapImage', blob);
    
                // save data to server
                try{
                    const config = {	
                      headers: {	        
                        'content-type': 'multipart/form-data'	      
                      },
                    };
                    axios.post('/api/save', formData, config).then(function (response) {
                      console.log(response);
                    })
                  }catch(error){
                    console.log(error)
                  }
            })
            setTimeout(() => {
                resolve();
            }, 500);
          });
      }
    
      draw(){
        const canvas = document.getElementById('mapImg');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, 0, 0, 800, 390);
        }
        axios.get('/api/get', {
            params: {
              ID: "origin_image"
            }
        }).then((response) =>{
            img.src = 'data:image/png;base64,' + response.data;
        })
    }
    componentDidMount(){
        this.draw();
    }

    render(){
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
                    {this.state.warning &&
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