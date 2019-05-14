import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkAuth } from '../../actions/users'
import { getAdditionalServicesAsync } from '../../actions/additionalServices'
import ConfirmTicket from '../../Components/Hall/ConfirmTicket/ConfirmTicket.js';
import { getMoviesAsync } from '../../actions/movies';
import { clearSelectedSeats } from '../../actions/seats';
import { buyTicketsAsync, clearBooking } from '../../actions/tickets';
import Spinner from '../../Components/Spinner/Spinner';
import { showSpinner, hideSpinner } from '../../actions/spinner'
import BoughtTickets from '../../Components/BoughtTickets/BoughtTickets'

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

  redirectByUrl= url => this.props.history.push(url);

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
          ? <BoughtTickets boughtTickets={this.state.boughtTickets} redirectByUrl={this.redirectByUrl}/>
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
  getAdditionalServicesAsync(id) {
    return dispatch(getAdditionalServicesAsync(id));
  },
  checkAuth() {
    return dispatch(checkAuth());
  },
  clearBooking(userId) {
    dispatch(clearBooking(userId));
  },
  onBuyTickets(tickets) {
    dispatch(buyTicketsAsync(tickets));
    dispatch(clearSelectedSeats())
  },
  getMoviesAsync() {
    return dispatch(getMoviesAsync());
  },
  showSpinner() {
    dispatch(showSpinner());
  },
  hideSpinner() {
    dispatch(hideSpinner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTicketsPage);
