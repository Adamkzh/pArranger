import React, { Component } from 'react';
import CheckoutContent from './CheckoutContent';
import '../style/Checkout.css';

class Checkout extends Component {

    componentDidMount(){
        window.sessionStorage.setItem('registered','SUCCESS');
    }
    render(){
        return (
            <div className='content'>
                <div className='_title'>
                        Checkout
                </div>
                <div className='itemList'>
                <CheckoutContent />
                </div>
            </div>
        )
    }
}

export default Checkout;