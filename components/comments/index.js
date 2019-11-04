/**
 * @file
 * Comments component
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OComments from 'o-comments/main.js';
import { flagsPropType } from '../../shared/proptypes';
import './styles.scss';

const Comments = ({ id, url, flags }) => {
  const ref = useRef();

  const { dark } = flags;

  useEffect(() => {
    (async () => {
      // prettier-ignore
      new OComments(ref.current, { // eslint-disable-line no-new
        articleUrl: url,
        articleId: id,
      });
    })();
  }, []);

  const comments = (
    <div className="o-grid-container">
      <div className="o-grid-row">
        <div
          ref={ref}
          data-o-component="o-comments"
          id="comments"
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

  if (dark) {
    return (
      <div className="pink">
        {comments}
      </div>
    );
  }

  return comments;
};

Comments.displayName = 'GComments';

Comments.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  flags: flagsPropType,
};

Comments.defaultProps = {
  title: 'Comments',
  id: '3a499586-b2e0-11e4-a058-00144feab7de',
  url: 'https://local.ft.com/comments-test',
  flags: {
    dark: false,
  },
};

export default Comments;
