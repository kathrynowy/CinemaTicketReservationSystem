import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const styles = theme => ({
  root: {
    width: '100%',
  },
  button: {
    whiteSpace: 'nowrap',
    border: 0,
    outline: 0,
    display: 'inline-block',
    height: '40px',
    lineHeight: '40px',
    padding: '0 14px',
    boxShadow: '0 4px 6px #32325d1a, 0 1px 3px #00000014',
    color: '#fff',
    backgroundColor: '#d40754',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    textDecoration: 'none',
    transition: 'all 150ms ease',
    marginTop: '10px',
    '&:hover': {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: '#681137 !important',
      transform: 'translateY(-1px)',
      boxShadow: '0 7px 14px #32325d1a, 0 3px 6px #00000014'
    }
  }
});


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
    const { classes } = this.props;
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
            <Button onClick={this.handleClose} color="primary" className={classes.button}>
              Cancel
            </Button>
            <Button onClick={() => this.buy()} color="primary" className={classes.button}>
              Buy
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaymentModal);
