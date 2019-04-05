import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'white'
  },
  formControl: {
    [theme.breakpoints.up('xs')]: {
      minWidth: 300,
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 150,
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 200,
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: 250,
    },
    margin: theme.spacing.unit,

    marginTop: '5px',
    color: 'white',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  select: {
    height: 40,
    borderRadius: '10px',
    backgroundColor: 'white',
    opacity: '0.4',
    color: 'white',
    '&:after': {
      border: 'none',
    },
  },
  input: {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    paddingLeft: '10px'
  }
});

class SimpleSelect extends React.Component {
  state = {
    city: '',
    cinema: '',
    movie: '',
    date: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off" style={{ display: 'flex', justifyContent: 'center' }}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-city" className={classes.input}>City</InputLabel>
          <Select
            className={classes.select}
            value={this.state.city}
            onChange={this.handleChange}
            inputProps={{
              name: 'city',
              id: 'select-city',
            }}
          >
            <MenuItem value="">
              <em>choose city</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-cinema" className={classes.input}>Cinema</InputLabel>
          <Select
            className={classes.select}
            value={this.state.cinema}
            onChange={this.handleChange}
            inputProps={{
              name: 'cinema',
              id: 'select-cinema',
            }}
          >
            <MenuItem value="">
              <em>choose cinema</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-movie" className={classes.input}>Movie</InputLabel>
          <Select
            className={classes.select}
            value={this.state.movie}
            onChange={this.handleChange}
            inputProps={{
              name: 'movie',
              id: 'select-movie',
            }}
          >
            <MenuItem value="">
              <em>choose movie</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
