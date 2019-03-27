import React, { Component } from 'react';


class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        console.log(this.props)
        return(
            <div>
                    {this.props.id}
            </div>
        );
    }
}

export default Detail;   