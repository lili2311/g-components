/**
 * @file
 * Comments component
 */

import React from 'react';
import PropTypes from 'prop-types';

const Comments = ({ title, id, url }) => (
  <div className="o-grid-container">
    <div className="o-grid-row">
      <div
        data-o-component="o-comments"
        id="comments"
        data-o-comments-auto-init="true"
        data-o-comments-config-title={title}
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
    </div>
  </div>
);

Comments.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};

Comments.defaultProps = {
  title: 'Comments',
  id: '3a499586-b2e0-11e4-a058-00144feab7de',
  url: 'https://local.ft.com/comments-test',
};

export default Comments;
