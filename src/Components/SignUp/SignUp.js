import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { signUp } from '../../actions/users';
import { Avatar, Button, CssBaseline, FormControl, Input, InputLabel, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import { validateAll } from 'indicative';
import { SIGN_UP } from '../../constans/actionTypes';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },

  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundColor: "rgb(255, 255, 255)"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    border: "3px solid rgb(245, 0, 87)",
    borderRadius: 10,
    backgroundColor: "transparent"
  },
  errorLabel: {
    color: 'red',
    fontSize: 14,
    marginTop: 3
  }
});

class SignIn extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      errors: {}
    })

    const data = this.state;
    const rules = {
      username: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed'
    }

    const messages = {
      required: 'This {{ field }} is required.',
      'email.email': 'The email is invalid.',
      'password.confirmed': "The password doesn't match",
      'password.min': "Please, enter more, than 6 letters"
    }

    validateAll(data, rules, messages)
      .then(() => this.props.signUp(data))
      .catch(errors => {
        const formattesErrors = {};
        errors.forEach(error => formattesErrors[error.field] = error.message)
        this.setState({ errors: formattesErrors })
      })
  }

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
        </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="username">Name</InputLabel>
              <Input id="username" name="username" autoComplete="name" autoFocus onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.name : ''}</span>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.email : ''}</span>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.password : ''}</span>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password_confirmation">Password (Confirmation)</InputLabel>
              <Input name="password_confirmation" type="password" id="password_confirmation" onChange={this.handleInputChange} />
              <span className={classes.errorLabel}>{this.state.errors ? this.state.errors.password : ''}</span>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign up
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signUp(userData) {
    dispatch({ type: SIGN_UP, userData });
  }
})

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, mapDispatchToProps)(SignIn));
