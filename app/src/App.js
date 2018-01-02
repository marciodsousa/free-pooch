import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import Header from './components/Header';
import SearchContent from './components/SearchContent';
import './styles/app.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="header__wrapper">
          <Header isMarkerShown />
        </div>
        <div className="content__wrapper">
          <SearchContent/>
        </div>
      </div>
    );
  }
}

export default App;
