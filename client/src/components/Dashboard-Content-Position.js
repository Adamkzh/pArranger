import React,{ Component } from 'react';
import { Message } from 'semantic-ui-react'
import html2canvas from 'html2canvas';
import DraggablePanel from './Dashboard-Content-Position-DraggablePanel';
import '../style/Position.css';
import Promise from 'promise';



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
    
      
      /**
       *  save canvas data
       */
      captureMap(){
          return (html2canvas(document.querySelector(".capture")).then(canvas => {
            this.saveDataToS3(canvas.toDataURL());
          }));
      }

      draw(){
        const canvas = document.getElementById('mapImg');
        const ctx = canvas.getContext('2d');
        var img = new Image();
        img.onload = () =>{
            ctx.drawImage(img, 0, 0, 800, 390);
        }
        img.src = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1475131974,834535367&fm=26&gp=0.jpg';
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