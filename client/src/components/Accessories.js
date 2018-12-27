import React, { Component } from 'react'
import '../style/Accessories.css'
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    region:'us-west-2',
    Bucket:'legionsolar-web-app'
});

class Accessories extends Component {

    constructor(props,context){
        super(props);
        this.state={
            sx:-154,
            sy:0,
            width:1461,
            height:440,
        }
        
    }
    componentDidMount(){
        window.sessionStorage.setItem('registered','SUCCESS');
        this.draw();
    }




draw(){
    const canvas = document.getElementById('realMapImg');
    const ctx = canvas.getContext('2d');
    var img = new Image();
    img.onload = () =>{
        ctx.drawImage(img, this.state.sx, this.state.sy, this.state.width, this.state.height);
    }
    var params = {
        Bucket: "legionsolar-web-app", 
        Key: 'PanelsMap/' + window.localStorage.getItem('uuid'),
        };
    s3.getObject(params, function(err, data) {
            // if (err) 
            // // console.log(err, err.stack); // an error occurred
            // else{
            // // console.log("data"+data);           // successful response
            // }     
            if(data === null){
                return;
            }
            img.src = data.Body;
    }); 
}
    

    isValidated(){
        return true;
    }

    render(){
        return (
            <div>
                <div className='_title'>
                        ACCESSORIES
                </div>
                    <div className='ui two column grid'>
                        <canvas className="FinalMapImg" id="realMapImg" width="800" height = "410" > 
                        </canvas>
                        <div className='AList'>
                            <div>
                                Comming Soon...
                            </div>
                        </div>
                    </div>  
                </div>
        )
    }
}

export default Accessories;