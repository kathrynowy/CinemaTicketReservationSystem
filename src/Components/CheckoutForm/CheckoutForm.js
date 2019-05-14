import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import './CheckForm.scss';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { isSubmit: props.isSubmit };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSubmit) {
      this.setState({ isSubmit: nextProps.isSubmit })
    }
  }

  submit = async () => {
    let { token } = await this.props.stripe.createToken();
    this.setState({
      isSubmit: false
    })
    this.props.postSubmit();
    this.props.buyConfirmedTickets(token);
  }

  render() {
    if (this.state.isSubmit) this.submit();
    return (
      <div className="checkout">
        <CardElement />
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
