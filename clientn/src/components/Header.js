import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'


var activeTag = "home";

class HomepageHeading extends Component {

    constructor(props){
      super(props);
      activeTag = this.props.activeTag;
    }

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
              <Menu.Item as={Link} to='/' active={activeTag === "home"}>HOME</Menu.Item>
              <Menu.Item as={Link} to='/design' active={activeTag === "design"}>DESIGN</Menu.Item>
              <Menu.Item as={Link} to='/dashboard/admin' active={activeTag === "dashboard"}>DASHBOARD</Menu.Item>
              <Menu.Item as={Link} to='/search' >SEARCH</Menu.Item>
              <Menu.Item as={Link} to= '/console' active={activeTag === "console"}>CONSOLE</Menu.Item>
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