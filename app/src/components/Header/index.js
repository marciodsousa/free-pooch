import React, { Component } from 'react';
import  {connect } from 'react-redux';
import './header.scss';

import { addDumbResult } from '../../actions'

function mapDispatchToProps(dispatch) {
  return {
    addDumbResult: article => dispatch(addDumbResult(article))
  };
}

class ConnectedHeader extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
     <div className="header__container">
        This is a fine Header Mah man! and a small test!
        <button onClick={this.props.addDumbResult}>
              Search
            </button>
     </div>
    );
  }
}
const Header = connect(null, mapDispatchToProps)(ConnectedHeader);

export default Header;
