import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Menu,
  } from 'semantic-ui-react'


class HomepageHeading extends Component {

    initStepzilla= () => {
        if(window.localStorage.getItem('step') === undefined){
           window.localStorage.setItem('step',0);
        }
    
    }
    render(){ 
        return(
            <Menu
            inverted={false}
            pointing={false}
            secondary={false}
            size='large'
            >
            <Container>
                <Menu.Item position='left' as={Link} to='/' active>HOME</Menu.Item>
                <Menu.Item position='right' as={Link} to='/login' >SIGN IN</Menu.Item>
            </Container>
            </Menu>
        );
    }
}

export default HomepageHeading;