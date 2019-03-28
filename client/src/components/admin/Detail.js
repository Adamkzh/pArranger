import React, { Component } from 'react';
import { Icon,Segment, Header, Container} from 'semantic-ui-react';
import '../../style/admin/Detail.css'

class Detail extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    render(){
        return(
        <Container style={{ margin: 20 }}>
        <Icon className="backbutton" name='arrow left' size='huge' onClick={this.props.backFunc} />
        <Segment attached="top">
          <Header as="h2" content="Card carousel" />
          <p>
            This prototype features how to create a carousel with the{" "}
            <code>Card</code> component, take a look into{" "}
            <code>examples/CardCarousel</code> to get more details.
          </p>
        </Segment>
        <Segment attached="bottom">

        </Segment>
  
        <Segment attached="top">
          <Header as="h2" content="Image carousel" />
          <p>
            This prototype features how to create a carousel with images, take a
            look into <code>examples/ImageCarousel</code> to get more details.
          </p>
        </Segment>
        <Segment attached="bottom">
        cc
        </Segment>
        </Container>

        );
    }
}

export default Detail;   