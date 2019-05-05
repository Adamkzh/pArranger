import React, { Component } from 'react';
import Header from '../Header';
import CityContent from './City-Content';

class SingleCityContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined,
            city: null
        }

        const cur_city = this.getCurrentCity();
        console.log(cur_city)
        if (cur_city) {
            this.state = {
                ...this.state,
                city: cur_city
            }
        }
    }

    componentDidMount() {
        // Fetch Data Here
    }

    getCurrentCity = () => {
        const list = window.location.pathname.split('/');
        if (list.length >= 3) {
            let city = list[2];
            if (city === 'sunnyvale') {
                city = 'Sunnyvale';
            } else if (city === 'sanjose') {
                city = 'SanJose';
            } else if (city === 'paloalto') {
                city = 'PaloAlto';
            }
            return city;
        }
    };


    render(){
        return this.state.city ?
            (<div>
                <Header activeTag={"console"}/>
                <CityContent city={this.state.city}/>
            </div> )
            : null;
    }
}

export default SingleCityContent;