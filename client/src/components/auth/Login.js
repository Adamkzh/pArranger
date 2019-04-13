import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  change(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit(e) {
    e.preventDefault();
    axios.post('/auth/getToken', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.props.history.push('/protected')
    }).catch(() => this.setState({

      error: true
    }));
  }

  render() {
    const { error } = this.state;
    return(
        <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                {/* <Image src='/logo.png' />  */}
                Log-in to your account
              </Header>
              <Form onSubmit={e => this.submit(e)} size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" onChange={e => this.change(e)}/>
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name="password"
                    onChange={e => this.change(e)}
                  />

                  <Button type="submit" color='teal' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='/signup'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
          {error && <p>Invalid credentials</p>}
        </div>
    )
    
  }
}

export default LoginForm