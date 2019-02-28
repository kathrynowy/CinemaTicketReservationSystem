import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className="admin-page">
        <div className="admin-page__tabs">
          <div>Cinemas</div>
          <div>Movies</div>
          <div>Sessions</div>
        </div>
        <div className={`admin-page__cinemas`}>

        </div>
      </div>
    );
  }
}

export default Main;