import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './SignUp.scss'
import Input from '@material-ui/core/Input';

import TextField from '@material-ui/core/TextField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class SignUp extends Component {
  render() {
    return (
      <div className="signup-form">
        <form >


          <input type="text" placeholder="username" required autoFocus={true} />
          <TextField label="Custom CSS" />
          <input type="password" placeholder="password" required />
          <input type="password" placeholder="password repeat" required />
          <Link to="/"><button>Home</button></Link>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

