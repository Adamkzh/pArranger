import React ,{ Component }from 'react';
// import { Link } from 'react-router-dom';
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
                <Menu.Item as='a' active>
                Home
                </Menu.Item>
                <Menu.Item as='a'>Work</Menu.Item>
                <Menu.Item as='a'>Company</Menu.Item>
                <Menu.Item as='a'>Careers</Menu.Item>
                <Menu.Item position='right'>
                <Button as='a' inverted={!true}>
                    Log in
                </Button>
                <Button as='a' inverted={true} primary={true} style={{ marginLeft: '0.5em' }}>
                    Sign Up
                </Button>
                </Menu.Item>
            </Container>
            </Menu>
        );
    }
}

export default HomepageHeading;