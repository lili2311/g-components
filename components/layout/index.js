/**
 * @file
 * Main page layout view
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { strftime } from '../../shared/helpers';
import { flagsPropType } from '../../shared/proptypes';
import Header from '../header';
import ArticleHead from '../article-head';
import OnwardJourney from '../onwardjourney';
import Comments from '../comments';
import Footer from '../footer';
import './styles.scss';

const Layout = ({ flags = {}, children, ...props }) => (
  <Fragment>
    {flags.header && <Header key="header" {...props} />}
    <main key="main" role="main">
      <article className="article" itemScope itemType="http://schema.org/Article">
        <div className="article-head o-grid-container">
          <div className="o-grid-row">
            <header data-o-grid-colspan="12 S11 Scenter M9 L8 XL7">
              <ArticleHead {...props} flags={flags} />
            </header>
          </div>
        </div>
        <div className="article-body o-typography-wrapper" itemProp="articleBody">
          <div className="o-grid-container">
            <div className="o-grid-row">
              <div data-o-grid-colspan="12 S11 Scenter M9 L8 XL7">
                <div>
                  {children}
                </div>
              </div>
            </div>
          </div>

          <footer
            className="o-typography-footer"
            itemProp="publisher"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div className="o-grid-container">
              <div className="o-grid-row">
                <div data-o-grid-colspan="12 S11 Scenter M9 L8 XL7">
                  <small>
                    <a
                      href="http://www.ft.com/servicestools/help/copyright"
                      data-trackable="link-copyright"
                    >
                      Copyright
                    </a>
                    {' '}
                    <span itemProp="name">
The Financial Times
                    </span>
                    {' '}
Limited
                    {' '}
                    {strftime('%Y')(new Date())}
                    . All rights reserved. You may share using our article tools. Please don&apos;t
                    cut articles from FT.com and redistribute by email or post to the web.
                  </small>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
    {flags.onwardjourney && <OnwardJourney key="oj" {...props} />}
    {flags.comments && <Comments key="comments" {...props} />}
    {flags.footer && <Footer key="footer" {...props} />}
  </Fragment>
);

Layout.propTypes = {
  id: PropTypes.string,
  flags: flagsPropType.isRequired,
  children: PropTypes.node,
};

Layout.defaultProps = {
  id: '',
  children: null,
};

export default Layout;
