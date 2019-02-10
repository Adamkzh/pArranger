import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
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
                <Menu.Item as={Link} to='/' > Home </Menu.Item>
                <Menu.Item as={Link} to='/admin'>Admin</Menu.Item>
            </Container>
            </Menu>
        );
    }
}

export default HomepageHeading;