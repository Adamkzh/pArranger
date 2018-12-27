import React, { Component } from 'react';
import LegionSolarLogo from '../image/LegionSolarLogo.png';
import { Button } from 'semantic-ui-react';
import Footer from './Footer';
import '../style/Home.css';
import '../style/Footer.css';
import { Link } from 'react-router-dom';


class Home extends Component {

  initStepzilla(){
    if(window.localStorage.getItem('step') === undefined){
       window.localStorage.setItem('step',0);
    }
  }


  render() {
    return (
        <div className="Home">
        <header className="Home-header">
          <img src={LegionSolarLogo} className="Home-logo" alt='logo'/>
        </header>
        <div className="Buttons">
          <Link to="/learn">
            <Button className="newButton" inverted size='big' >LEARN MORE</Button>
          </Link>
          <Link to="/try">
            <Button className="newButton" inverted size='big' >TRY OUR STARTER SET</Button>
          </Link>
          <Link to="/dashboard">
            <Button className="newButton" inverted size='big' onClick={this.initStepzilla}>BUILD YOUR SYSTEM</Button>
          </Link>
        </div>
        <Footer />
        </div>
    );
  }
}

export default Home;
