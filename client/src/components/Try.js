import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Try.css'
import { Button } from 'semantic-ui-react';
import ReactGA from 'react-ga';

class Try extends Component{
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
                <div className='section-title-head'>Starter Set</div>
                <div className="introduction">
                <div className="intro-head">
                </div> 
                    <div className="intro-para">
                    The Legion Solar™ starter set give you the opportunity for you to experience how easy it is 
                    for you to generate your own clean energy. The kit includes lightweight solar panels, a micro-inverter to convert sunlight into grid energy, a bluetooth enabled SolarRegulator™ 
                    for smartphone monitoring of your home’s production and consumption, 2 split core transformers to 
                    prevent energy from flowing back to the grid, plug and play wiring for easy installation and aluminum Z 
                    brackets for easy DIY (do-it-yourself) mounting. The kit is also compatible with our composite shingle, 
                    tile and metal roof racking solutions.  
                    <p></p>
                    <p></p>
                    The Starter Set installs in minutes and delivers instant results, 
                    thus lowering the cost of your electric bill. A Starter Set can produce enough 
                    electricity to offset your TV and all of your hand held electronic devices. 
                    It is the base component you need in the Legion Solar™ system if you close to grow your 
                    system with expansion sets later on. 
                    <p></p>
                    <p></p>
                    Legion Solar™ is energy made simple. Order your starter set today!
                    </div>
                    <div className="mainVideo" align="center"> 
                            <iframe title="main" width='90%' height="480" src="https://www.youtube.com/embed/KjnKmRKp4EA" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            {/* <p style={{height:'40px', marginTop:'10px'}}> Starter Set </p> */}
                    </div>
                    

                    <div className='orderNowBtn'>
                        <div className='ordernowleft' >
                            <a href="http://www.plxdevices.com/Legion-DIY-Plug-and-Play-Solar-p/897346002894.htm" rel="noopener noreferrer" target="_blank"> 
                            <Button  
                                color='orange'
                                size='small'
                                circular={true}
                            >BUY NOW 120 VAC</Button>
                            </a>
                        </div>
                        <div className='ordernowright' >
                            <a href="http://www.plxdevices.com/Legion-DIY-Plug-and-Play-Solar-p/897346002993.htm" rel="noopener noreferrer" target="_blank"> 
                            <Button  
                                color='orange'
                                size='small'
                                circular={true}
                            >BUY NOW 230 VAC</Button>
                            </a>
                        </div>
                    </div>
                </div>
            <Footer />
            </div>
        )
    }
}

export default Try;