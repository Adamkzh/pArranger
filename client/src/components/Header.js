import React ,{ Component }from 'react';
import LegionSolarLogo from '../image/LegionSolarLogo.png';
import {Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "../style/Header.css"

class Header extends Component {
    render(){  
        return(
            <header className="Dashboard-Header">
                <Link to="/">
                    <img src={LegionSolarLogo} className="dashboard-logo" alt='logo'/>
                </Link>
                <Link to="/" className='HomeIcon'>
                    <Icon 
                        name='home' 
                        size='large'
                        inverted={true}
                    />
                    Home
                </Link>
            </header>
        );
    }
}

export default Header;