import React, { Component } from 'react';
import PrimarySearchAppBar from '../../Components/PrimarySearchAppBar/PrimarySearchAppBar.js'
import Select from '../../Components/Select/Select.js'
import CardList from '../../Components/CardList/CardList.js';
import movieData from '../../movieData.js'
import { connect } from "react-redux";
import { getMoviesAsync } from '../../actions/index.js'

class MainPage extends Component {
  componentDidMount() {
    this.props.getMoviesAsync(movieData) 
  }

  render() {
    console.log(this.props.movies);
    return (
      <div className="main-page">
        <Select />
        <CardList movies={this.props.movies}/>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  movies: store.movies.movies
})

const mapDispatchToProps = dispatch => ({
  getMoviesAsync(movieData) {
    dispatch(getMoviesAsync(movieData));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
