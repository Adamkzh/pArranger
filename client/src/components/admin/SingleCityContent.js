import React, { Component } from 'react';
import Header from '../Header';
import CityContent from './City-Content';

class SingleCityContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined
        }
    }
    render(){
        return(
            <div>
                <Header activeTag={"console"}/>
                <CityContent city={"SanJose"}/>
            </div>
        );
    }
}

export default SingleCityContent;