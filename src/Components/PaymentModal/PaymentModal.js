import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm'


class PaymentModal extends React.Component {
  state = {
    isOpen: false,
    isSubmit: false
  };

  handleClickOpen = () => this.setState({ isOpen: true });

  handleClose = () => this.setState({ isOpen: false });

  buy = () => this.setState({ isSubmit: true });

  postSubmit = () => this.setState({ isSubmit: false, isOpen: false });

  render() {
    return (
      <div>
        <button type="button" className="button" onClick={this.handleClickOpen}>
          Buy
        </button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Payment for your tickets</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To purchase the tickets please enter data of your card
            </DialogContentText>

            <Elements>
              <CheckoutForm buyConfirmedTickets={this.props.buyConfirmedTickets} isSubmit={this.state.isSubmit} postSubmit={this.postSubmit} />
            </Elements>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" className="form-dialog__button">
              Cancel
            </Button>
            <Button onClick={() => this.buy()} color="primary" className="form-dialog__button">
              Buy
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PaymentModal;
