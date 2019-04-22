import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import { Container, Menu, Dropdown,} from 'semantic-ui-react'


var activeTag = "home";

class HomepageHeading extends Component {

    constructor(props){
      super(props);
      activeTag = this.props.activeTag;
      var adminStatus;
      if(window.localStorage.getItem('admin')=== "false"){
        adminStatus = false;
      }else{
        adminStatus = true;
      }
      this.state = {
        idLink : "/",
        admin: adminStatus,
      }
    }

    initStepzilla= () => {
        if(window.localStorage.getItem('step') === undefined){
           window.localStorage.setItem('step',0);
        }
    }

    componentDidMount = ()=>{
      if(window.localStorage.getItem('uuid') !== null){
          this.setState({
            idLink : "/dashboard/" + window.localStorage.getItem('uuid')
          })
      }
    }
    
    render(){ 
        var temp = this.state.admin ? "Admin" : "User";
        var hello = "Hello, "+ temp;
        
        var tempButton = ( 
        <Menu.Item >
          <Dropdown 
          style={{
          "marginRight" : '15px',
          "marginTop" : '5px'
          }} 
          text={hello}
          >
            <Dropdown.Menu>
              <Dropdown.Item
                icon="user" text={this.state.admin ? "User Login" : "Admin Login"} 
                onClick={()=>{
                  this.setState({
                    admin: !this.state.admin
                  })
                  window.localStorage.setItem('admin', !this.state.admin);
                  }} 
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>)

        return(
         <div>
            {!this.state.admin  && 
            <Menu>
              <Container>
                <Menu.Item as={Link} to='/' active={activeTag === "home"}>HOME</Menu.Item>
                <Menu.Item as={Link} to='/design' active={activeTag === "design"}>DESIGN</Menu.Item>
                <Menu.Item as={Link} to= {this.state.idLink} active={activeTag === "dashboard"}>DASHBOARD</Menu.Item>
              </Container>
              {tempButton}
            </Menu>}

            
          {this.state.admin  && 
            <Menu>
              <Container>
              <Menu.Item as={Link} to='/' active={activeTag === "home"}>HOME</Menu.Item>
              <Menu.Item as={Link} to='/search' >SEARCH</Menu.Item>
              <Menu.Item as={Link} to= '/console' active={activeTag === "console"}>DASHBOARD</Menu.Item>
            </Container>
            {tempButton}
            </Menu>
          }
          </div>
        );
    }
}

export default HomepageHeading;