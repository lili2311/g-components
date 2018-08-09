/**
 * @file
 * Comments component
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import oComments from 'o-comments/main';
import './styles.scss';

class Comments extends PureComponent {
  componentDidMount() {
    oComments.init();
  }

  render() {
    const {
      title, id, url, headline,
    } = this.props;
    const { oCommentsIsBroken } = this.state;
    return (
      <div className="o-grid-container">
        <div className="o-grid-row">
          {!oCommentsIsBroken && (
            <div
              data-o-component="o-comments"
              id="comments"
              data-o-comments-auto-init="false"
              data-o-comments-config-title={title || headline}
              data-o-comments-config-url={url}
              data-o-comments-config-article-id={id}
              data-o-grid-colspan="12 S11 Scenter M9 L8 XL7"
            >
              <div className="o--if-no-js">
                To participate in this chat, you need to upgrade to a newer web browser.
                {' '}
                <a href="http://help.ft.com/tools-services/browser-compatibility/">
Learn more.
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  title: PropTypes.string,
  headline: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};

Comments.defaultProps = {
  title: 'Comments',
  headline: 'Comments',
  id: '3a499586-b2e0-11e4-a058-00144feab7de',
  url: 'https://local.ft.com/comments-test',
};

export default Comments;
