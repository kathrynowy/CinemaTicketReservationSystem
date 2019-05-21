import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalIcon from '@material-ui/icons/LocalActivity';
import FolderIcon from '@material-ui/icons/FolderOpen';

import { getBoughtTicketsAsync } from '../../actions/tickets'

import './UserPage.scss';


const OPTIONS_DATE = {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
};

const OPTIONS_TIME = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
};

const styles = theme => ({
  root: {
    width: 500,
    height: 80,
    display: 'flex',
    justifyContent: 'space-evenly',
    borderBottom: '1px solid black',

    [theme.breakpoints.up('xs')]: {
      width: 350,
    },
    [theme.breakpoints.up('sm')]: {
      width: 400,
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 500,
    },
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
});

class SimpleBottomNavigation extends React.Component {
  state = {
    value: 0,
    tickets: [],
  };

  async componentDidMount() {
    await this.props.getBoughtTickets(true);
    const date = new Date().getTime();
    if (this.state.value === 0) {
      this.setState({
        tickets: this.props.boughtTickets.filter(ticket => ticket.time >= date)
      })
    } else {
      this.setState({
        tickets: this.props.boughtTickets.filter(ticket => ticket.time < date)
      })
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
    const date = new Date().getTime();
    if (value === 0) {
      this.setState({
        tickets: this.props.boughtTickets.filter(ticket => ticket.time >= date)
      })
    } else {
      this.setState({
        tickets: this.props.boughtTickets.filter(ticket => ticket.time < date)
      })
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="user-profile">
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction label="Current" icon={<LocalIcon />} />
          <BottomNavigationAction label="Archieve" icon={<FolderIcon />} />
        </BottomNavigation>
        <div className="user-profile__tickets">
          {
            this.state.tickets.map(ticket => {
              return (
                <div className="user-profile__ticket bought-ticket" key={ticket.id}>
                  <span className="bought-ticket__movie">{ticket.movieId.name}, {ticket.cost} BYN</span>

                  <div className="bought-ticket__info">
                    <div className="bought-ticket__place">
                      <span className="bought-ticket__city">{ticket.cinemaId.city},</span>
                      <span className="bought-ticket__cinema">{ticket.cinemaId.name}</span>
                    </div>

                    <div className="bought-ticket__hall-info">
                      <span>hall: {ticket.hallId.name}</span>
                      <span>row {ticket.row} seat {ticket.seat}</span>
                    </div>

                    <div className="bought-ticket__date-info">
                      <span className="bought-ticket__time">{new Date(+(ticket.time)).toLocaleString('en', OPTIONS_TIME)}</span>
                      <span className="bought-ticket__date">{new Date(+(ticket.time)).toLocaleString('en', OPTIONS_DATE)}</span>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  boughtTickets: store.ticketsList.boughtTickets
})

const mapDispatchToProps = dispatch => ({
  getBoughtTickets(info) {
    return dispatch(getBoughtTicketsAsync(info));
  }
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SimpleBottomNavigation));
