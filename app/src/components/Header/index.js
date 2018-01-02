import React, { Component } from 'react';
import './header.scss';

class Header extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
     <div className="header__container">
        This is a fine Header Mah man!
     </div>
    );
  }
}

export default Header;
