import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'


class HomepageHeading extends Component {

    initStepzilla= () => {
        if(window.localStorage.getItem('step') === undefined){
           window.localStorage.setItem('step',0);
        }
    
    }
    render(){ 
        var fixed = true;
        return(
         <Menu>
            <Container>
              <Menu.Item as={Link} to='/' active>HOME</Menu.Item>
              <Menu.Item as={Link} to='/admin' >ADMIN</Menu.Item>
              <Menu.Item position='right'>
                <Button as={Link} to='/login' inverted={!fixed}>
                  SIGN IN
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
        );
    }
}

export default HomepageHeading;