/**
 * @file
 * Top of the article
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Share from './share';
import { ftdate, getMainImage, getSeparator } from '../helpers';
import { mainImagePropType, topicPropType } from '../helpers/proptypes';

/* eslint-disable no-nested-ternary */
export const Byline = ({ bylines }) => (
  <Fragment>
    By
    {' '}
    {Array.isArray(bylines) ? (
      bylines.map(
        (author, idx) => (author.url ? (
          <Fragment key={author}>
            <a href={author.url} className="o-typography-author">
              {author.name}
            </a>
            {getSeparator(idx, bylines)}
          </Fragment>
        ) : (
          <span className="o-typography-author">
            {author.name}
          </span>
        )),
      )
    ) : bylines.url ? (
      <a href={bylines.url} className="o-typography-author">
        {bylines.name}
      </a>
    ) : (
      <span className="o-typography-author">
        {bylines.name}
      </span>
    )}
  </Fragment>
);

/* eslint-enable */

const BylinesPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ),
]);

Byline.propTypes = {
  bylines: BylinesPropType.isRequired,
};

const ArticleHead = ({
  topic,
  headline,
  summary,
  relatedArticle,
  mainImage,
  flags,
  bylines,
  publishedDate,
  ...props
}) => (
  <Fragment>
    <div>
      <a href={topic.url} className="o-typography-topic">
        {topic.name}
      </a>
    </div>

    <h1 className="o-typography-headline" itemProp="headline">
      {headline}
    </h1>

    <div className="o-typography-standfirst">
      {summary}
      {relatedArticle && (
        <a href={relatedArticle.url} className="o-typography-link">
          {relatedArticle.text}
        </a>
      )}
    </div>
    <meta itemProp="dateModified" content={publishedDate.toISOString()} />

    {(mainImage.url || mainImage.uuid) && (
      <figure className="graphic graphic-b-1 graphic-pad-1">
        <img alt={mainImage.description} src={getMainImage(mainImage)} />
        <figcaption className="o-typography-caption">
          {mainImage.description}
          {mainImage.credit}
        </figcaption>
      </figure>
    )}

    {flags && flags.shareButtons && <Share headline={headline} {...props} />}

    <div>
      {bylines && <Byline bylines={bylines} />}

      {publishedDate && (
        <span
          data-o-component="o-date"
          className="o-date o-typography-timestamp"
          dateTime={publishedDate.toISOString()}
        >
          {ftdate(publishedDate)}
        </span>
      )}
    </div>
  </Fragment>
);

ArticleHead.propTypes = {
  flags: PropTypes.shape({}).isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  mainImage: mainImagePropType,
  relatedArticle: PropTypes.shape({}),
  publishedDate: PropTypes.instanceOf(Date),
  topic: topicPropType,
  bylines: BylinesPropType,
};

ArticleHead.defaultProps = {
  mainImage: {
    uuid: 'f07ccec8-7ded-11e8-af48-190d103e32a4',
  },
  relatedArticle: {},
  publishedDate: new Date(),
  summary: '',
  topic: {},
  bylines: [],
};

export default ArticleHead;
