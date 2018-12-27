import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Header,
    Icon,
  } from 'semantic-ui-react'


class HomepageHeading extends Component {

    initStepzilla= () => {
        if(window.localStorage.getItem('step') === undefined){
           window.localStorage.setItem('step',0);
        }
    
    }
    render(){  
        return(
            <Container text>
                <Header
                as='h1'
                content='Panel Arranger'
                inverted
                style={{
                    fontSize:'4em',
                    fontWeight: 'normal',
                    marginBottom: 0,
                    marginTop: '3em',
                }}
                />
                <Header
                as='h2'
                content='Do whatever you want when you want to.'
                inverted
                style={{
                    fontSize: '1.7em',
                    fontWeight: 'normal',
                    marginTop: '1.5em',
                }}
                />
                <Link to="/dashboard">
                    <Button primary onClick={this.initStepzilla} size='huge'>
                    Get Started
                    <Icon name='right arrow' />
                    </Button>
                </Link>
            </Container>
        );
    }
}

export default HomepageHeading;