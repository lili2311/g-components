/**
 * @file
 * Header component
 */

import React, { PureComponent } from 'react';
import OHeader from 'o-header/main.js';
import './styles.scss';
import '../../shared/styles.scss';

class Header extends PureComponent {
  ref = React.createRef();

  componentDidMount() {
    new OHeader(this.ref.current); // eslint-disable-line no-new
  }

  render() {
    return (
      <header
        ref={this.ref}
        className="o-header o-header--simple"
        data-o-component="o-header"
        data-o-header--no-js=""
      >
        <div className="o-header__row o-header__top">
          <div className="o-header__container">
            <div className="o-header__top-wrapper">
              <div className="o-header__top-column o-header__top-column--center">
                <a
                  className="o-header__top-logo"
                  href="http://www.ft.com/"
                  title="Go to Financial Times homepage"
                >
                  <span className="o-header__visually-hidden">
Financial Times
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
