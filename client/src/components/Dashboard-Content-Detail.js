import React, { Component } from 'react'
import '../style/Detail.css'


class Detail extends Component {

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
        this.draw();
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

    render(){
        return (
            <div>
                <div className='_title'>
                        Detail
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

export default Detail;