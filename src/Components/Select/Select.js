import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    marginBottom: '15px',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    city: '',
    cinema: '',
    film: '',
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
          <InputLabel htmlFor="select-city">City</InputLabel>
          <Select
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
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-cinema">Cinema</InputLabel>
          <Select
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
            <MenuItem value={10}>Октябрь</MenuItem>
            <MenuItem value={20}>Аврора</MenuItem>
            <MenuItem value={30}>Дом кино</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-film">Film</InputLabel>
          <Select
            value={this.state.film}
            onChange={this.handleChange}
            inputProps={{
              name: 'film',
              id: 'select-film',
            }}
          >
            <MenuItem value="">
              <em>choose date</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          {/* <DatePickers /> */}
        </FormControl>
      </form>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);