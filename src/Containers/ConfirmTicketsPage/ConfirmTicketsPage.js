import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GET_ADDITIONAL_SERVICES, BUY_TICKETS, CLEAR_BOOKING, CLEAR_SELECTED_LIST, CHECK_AUTH } from '../../constans/actionTypes';
import { checkAuth } from '../../actions/users';
import { showSpinner, hideSpinner } from '../../sagas/spinner'
import Spinner from '../../Components/Spinner/Spinner';
import BoughtTickets from '../../Components/BoughtTickets/BoughtTickets';
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import { GET_MOVIES } from '../../constans/actionTypes';

class ConfirmTicketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boughtTickets: [],
      url: ''
    };
  }

  displayBoughtTickets = (boughtTickets, url) => {
    this.setState({
      boughtTickets,
      url
    });
  }

  redirectByUrl = url => this.props.history.push(url);

  async componentDidMount() {
    this.props.showSpinner();
    await this.props.getAdditionalServicesAsync(this.props.match.params.cinemaId);
    await this.props.getMoviesAsync();
    this.props.hideSpinner();
  }

  buyTickets(tickets) {
    this.props.showSpinner();
    this.props.onBuyTickets(tickets);
    this.props.clearBooking(this.props.currentUser.id);
    this.props.hideSpinner();
  }

  render() {
    return (
      this.props.isLoading
        ? <Spinner />
        : this.state.boughtTickets.length
          ? <BoughtTickets boughtTickets={this.state.boughtTickets} redirectByUrl={this.redirectByUrl} />
          : <ConfirmTicket
            additionalServices={this.props.additionalServices}
            selectedSeats={this.props.selectedSeats}
            buyTickets={(tickets) => this.buyTickets(tickets)}
            cinemaId={this.props.match.params.cinemaId}
            movieId={this.props.match.params.movieId}
            hallId={this.props.match.params.hallId}
            time={this.props.match.params.time}
            redirectByUrl={this.redirectByUrl}
            displayBoughtTickets={this.displayBoughtTickets}
            movies={this.props.movies}
          />
    );
  }
}

const mapStateToProps = store => ({
  selectedSeats: store.seats.selectedSeats,
  movies: store.movies.allMovies,
  additionalServices: store.additionalServices.allAdditionalServices,
  currentUser: store.users.currentUser,
  isLoading: store.spinner.isLoading
})

const mapDispatchToProps = dispatch => ({
  getAdditionalServicesAsync(cinemaId) {
    return dispatch({ type: GET_ADDITIONAL_SERVICES, cinemaId });
  },
  checkAuth() {
    return dispatch({ type: CHECK_AUTH });
  },
  clearBooking(userId) {
    dispatch({ type: CLEAR_BOOKING, userId });
  },
  onBuyTickets(tickets) {
    dispatch({ type: BUY_TICKETS, tickets });
    dispatch({ type: CLEAR_SELECTED_LIST })
  },
  getMoviesAsync() {
    return dispatch({ type: GET_MOVIES });
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
