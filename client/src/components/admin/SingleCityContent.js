import React, { Component } from 'react';
import Header from '../Header';
import CityContent from './City-Content';
import axios from "axios";

const allData = require('../../dataByCity');


class SingleCityContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            user:undefined,
            city: null
        };

        const cur_city = this.getCurrentCity();
        console.log(cur_city)
        if (cur_city) {
            this.state = {
                ...this.state,
                city: cur_city,
                data: {...allData.data[cur_city]}
            }
        }
    }

    componentDidMount() {
        // Fetch Data Here
        // const fetchDataUrl = "/api/v1/charting/singleCityData";
        // axios.get(fetchDataUrl)
        //     .then((response) =>{
        //         if (response.data.success) {
        //             this.setState({
        //                 chargeCompare_data :response.data.result.chargeCompare,
        //                 dailyPowerGeneration_data : response.data.result.dailyPowerGeneration,
        //                 differentPower_data : response.data.result.differentPower,
        //                 numberOfSolarPanels_data : response.data.result.numberOfSolarPanels,
        //                 solarRadiance_data : response.data.result.solarRadiance,
        //             })
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
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


    render() {
        return this.state.city ?
            (<div>
                <Header activeTag={"console"}/>
                <CityContent city={this.state.city} data={this.state.data}/>
            </div> )
            : null;
    }
}

export default SingleCityContent;