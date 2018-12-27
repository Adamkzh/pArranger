import React, { Component } from 'react'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

import { Form,Button,Message } from 'semantic-ui-react';
import '../style/Register.css';
import AWS from 'aws-sdk';
import ReactGA from 'react-ga';



AWS.config.update({
    'accessKeyId':'AKIAIYVQFSGQWDI6KDUA',
    'secretAccessKey':'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',
  });


class Register extends Component {

    constructor(props){
        super(props);
        this.state={
            email : '',
            reEmail :'',
            varificationCode:'',
            varification: false,

            emailState : 'emailEmpty',
            emailVariClicked : false,
            errorMessage:'',
            successMessage:'',
            emailAlreadySent : false,
            
            codePassState: false,
            codeVariClicked : false,
            codeErrorMessage:'',
            codeSuccessMessage:'',

            nextClicked: false,
            registerClicked :false,
        }
    }

    isValidated(){
        //if user already registered just pass this step
        if( window.sessionStorage.getItem('registered') === 'SUCCESS'){
            return true;
        }
        this.setState({
            nextClicked : true
        })

        return this.state.varification;
    }

    componentDidMount(){
        ReactGA.initialize('UA-120152287-1'); //Unique Google Analytics tracking number
        this.fireTracking();
    }

    fireTracking() { 
        ReactGA.pageview('Register');
    }
    

    handleChange = (e, { name, value }) => {
        this.setState({
             [name]: value 
        },this.checkEmail)
    }

    checkEmail = () =>{
        if (this.state.email === ''){
            this.setState({
                emailState : 'emailEmpty',
                errorMessage : 'Email cannot be empty.'
            })
        }else if (this.state.reEmail === ''){
            this.setState({
                emailState : 'reEmailEmpty',
                errorMessage : 'Re-enter email cannot be empty.'
            })
        }else if(this.state.email !== this.state.reEmail){
            this.setState({
                emailState : 'notSame',
                errorMessage : 'Please enter same email address.'
            })
        }else if(this.state.email === this.state.reEmail && this.state.email !== ''){
            this.setState({
                emailState : 'same'
            })
        }
    }

    emailVarification = () => {
        const { email , reEmail } = this.state;
        // console.log(this.state.emailState);
        this.setState({
            emailVariClicked: true 
        })
        if(email !== reEmail || email ==='' || reEmail ===''){
            this.checkEmail();
            return;
        }

        //display varification code form

        this.setState({
            registerClicked : true
        })

        var poolData = {
            UserPoolId : 'us-west-2_jL5rsT8Fn', // Your user pool id here
            ClientId : '3j3soujcmqro31kjiicnb8m6mr' // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        var attributeList = [];

        var dataEmail = {
            Name : 'email',
            Value : email
        };
        window.localStorage.setItem('email',email);
        var attributeEmail = new CognitoUserAttribute(dataEmail);
        attributeList.push(attributeEmail);

        userPool.signUp(email, '@Password123', attributeList, null, (err, result) => {
                if (err) {
                    //if user already exists just let the user pass
                    if(err.code === "UsernameExistsException"){
                        if(this.state.codePassState){
                            this.setState({
                                varification : true,
                                emailAlreadySent : true,
                                successMessage : "You are already registered. Go next!"
                            })
                        }else{
                            this.setState({
                                varification : false,
                                emailAlreadySent :true,
                                successMessage: "Email already sent! Please enter the validation code"
                            })
                        }
                    }
                   
                    // console.log(err);
                    // alert(err.name || JSON.stringify(err));
                }else{
                    // var cognitoUser = result.user;
                    // console.log('user name is ' + cognitoUser.getUsername());
                    this.setState({
                        emailAlreadySent :true,
                        successMessage:'Email sent successfully.',
                    })
                }
        })
    }

    codeVarification = () =>{
        // console.log('code varification...')
        const { email, varificationCode } = this.state;
        var poolData = {
            UserPoolId : 'us-west-2_jL5rsT8Fn', // Your user pool id here
            ClientId : '3j3soujcmqro31kjiicnb8m6mr' // Your client id here
        };
        var userPool = new CognitoUserPool(poolData);
        var userData = {
            Username: email,
            Pool: userPool
        };

        var cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration( varificationCode, true, (err, result) => {
            if (err) {
                // console.log(err.name);

                var errormessage;
                if(err.name ==='CodeMismatchException' ){
                    errormessage = 'Code miss match! Please enter again!'
                }else if(err.name=== 'NotAuthorizedException' || err.name=== 'LimitExceededException'){
                    this.setState({
                        varification: true,
                        successMessage : 'You already registered. GO next!'
                    })
                    return;
                }else{
                    errormessage = 'Invalid Input! Please enter again!'
                }
                this.setState({ 
                    codeVariClicked:true,
                    codeErrorMessage: errormessage,
                    varification : false
                })
                // alert(err.name);
                return;
            }else{
                this.setState({
                    codeVariClicked :true,
                    varification : true,
                    codePassState: true,
                    codeSuccessMessage: 'Registered successfully!',
                })
            }
            // console.log('call result: ' + result);
        });
    }

    resendCode = () =>{
        const { email } = this.state;
        AWS.config.region = 'us-west-2';
        var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
        var params = {
            ClientId : '3j3soujcmqro31kjiicnb8m6mr',// Your client id here
            Username: email,
          };
          cognitoidentityserviceprovider.resendConfirmationCode(params, function(err, data) {
           
          });
    }



    render(){
        const { email , reEmail, varificationCode} = this.state;
        return (
            <div>
                <div className='_title'>
                        Register
                </div>
                <div className='emailInput' >
                {/* true = show  */}
                        <Form size={'small'}  
                            success={this.state.emailAlreadySent} 
                            error={ !(this.state.emailState === 'same')&& this.state.emailVariClicked} 
                            onSubmit={this.emailVarification} >

                            Your Email
                            <Form.Input 
                                type='email'
                                name='email'
                                placeholder='LegionSolar@plx.com' 
                                value ={email}
                                onChange={this.handleChange}
                                />
                            Re-enter Email
                            <Form.Input
                                type='email'
                                name='reEmail'
                                placeholder='LegionSolar@plx.com'
                                value ={reEmail}
                                onChange={this.handleChange}
                                />
                            <Message
                                error
                                content={this.state.errorMessage}
                            />
                            <Message 
                               success 
                               content ={this.state.successMessage}
                            />
                            <Button>
                                Register
                            </Button>

                            {   
                                this.state.registerClicked &&
                                <Button
                                    className="resendCode"
                                    onClick={this.resendCode}
                                >
                                    Resend Code
                                </Button>
                            }
                     
                        </Form> 
                        <div>
                        <p></p>
                        {
                              this.state.registerClicked &&
                        <div>
                            <Form size={'small'} 
                            success={this.state.codePassState} 
                            error={!this.state.codePassState && this.state.codeVariClicked} 
                            onSubmit={this.codeVarification} 
                            >
                                Varification Code
                            <Form.Input 
                                className='validCode'
                                name='varificationCode'
                                placeholder='Varification Code'
                                value={varificationCode}
                                onChange={this.handleChange}
                            />
                            <Message 
                            success 
                            content ={this.state.codeSuccessMessage}
                            />
                            <Message 
                            error 
                            content ={this.state.codeErrorMessage}
                            />
                            <Button
                            >Confirm
                            </Button>
                            </Form> 
                            <p> </p>
                            <Form error ={ this.state.nextClicked && !this.state.varification}>
                            <Message 
                                error
                                content ={'Please Register First!'}
                            />
                            </Form>
                        </div>
                        }
                      </div> 
                </div>  
            </div>
        )
    }
}

export default Register;