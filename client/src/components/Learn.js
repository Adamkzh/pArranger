import React, { Component } from 'react';
import Header from './Header';
import Footers from './Footer';
import "../style/Learn.css"
import ReactGA from 'react-ga';

class Learn extends Component{

    componentDidMount(){
        ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
    }
    fireTracking() {
        ReactGA.pageview(window.location.hash);
    }
    render(){
        this.fireTracking();
        return (
            <div>
            <Header />
                <div className='section-title-head'>About Legion Solar™</div>
                <div className="introduction">
                <div className="intro-head">
                </div> 
                    <div className="intro-para">
                    Legion Solar™ is a unique solar system where the cost is as low as $1.50/watt compared to traditional 
                    system that are upwards of $4.00/watt. This 267% economical advantage is made possible by our unique solution.
                    <p/>
                    <p/>
                    One of the reasons why Legion Solar™ is so unique is not only the money saving DIY (do-it-yourself) aspect, 
                    we’ve created a technology called Solar Regulator™. It’s a device that contains the energy that you produce 
                    behind your utility meter where the power company does not own. It’s like a one way valve where energy can come in, 
                    but energy doesn’t flow back to the grid. 
                    <p/>
                    <p/>
                    This changes game for home energy production because you no longer need to seek interconnection permission with our 
                    innovative solution. Approvals, permits, on site inspections are all done away with giving you the freedom to make 
                    your own energy by connecting Legion Solar in your home like any appliance. Please watch the videos below to learn 
                    more:
                    </div>

                    <div className="mainVideo" align="center"> 
                            <iframe title="main" width="90%" height="480" src="https://www.youtube.com/embed/X-NPcxmvcvA" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            <p></p>
                            <p></p>
                            {/* <p style={{height:'40px', marginTop:'10px'}}> Descriptions </p> */}
                    </div>

                    <div className='video-container'>
                        <div className="leftVideo">
                            <iframe title="1" width="100%" height="280" src="https://www.youtube.com/embed/GzHrErw32r4" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen ></iframe>
                            {/* <p style={{height:'40px', marginTop:'10px'}}> Description1 </p> */}
                        </div>
                        <div className="rightVideo">
                            <iframe title="2" width="100%" height="280" src="https://www.youtube.com/embed/9f2CafGEHV4" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            {/* <p style={{height:'40px', marginTop:'10px'}}> Descriptions2 </p> */}
                        </div>
                    </div>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    <div className='video-container'>
                        <div className="leftVideo">
                            <iframe title="1" width="100%" height="280" src="https://www.youtube.com/embed/IGmjot-WXfs" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen ></iframe>
                            {/* <p style={{height:'40px', marginTop:'10px'}}> Description1 </p> */}
                        </div>
                    </div>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <p></p>
                </div>
            <Footers />
            </div>
        )
    }
}

export default Learn;