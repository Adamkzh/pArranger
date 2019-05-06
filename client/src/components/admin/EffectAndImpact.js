import React, { Component } from 'react';
import Header from '../Header';
import EffectAndImpactContent from './EffectAndImpact-Content';

class EffectAndImpact extends Component{
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
                <EffectAndImpactContent selected={this.props.selected}/>
            </div>
        );
    }
}

export default EffectAndImpact;