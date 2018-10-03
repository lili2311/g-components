/**
 * @file
 * Top of the article
 */

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import ODate from 'o-date/main.js';
import Share from '../share';
import { ftdate, getMainImage } from '../../shared/helpers';
import { mainImagePropType, topicPropType } from '../../shared/proptypes';
import './styles.scss';

const BylinesPropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
]);

export class Byline extends PureComponent {
  dateRef = React.createRef();

  static displayName = 'GByline';

  static propTypes = {
    names: BylinesPropType,
    date: PropTypes.string,
  };

  static defaultProps = {
    names: null,
    date: null,
  };

  async componentDidMount() {
    new ODate(this.dateRef.current); // eslint-disable-line no-new
  }

  render() {
    const { names, date } = this.props;
    if (!names && !date) return null;
    const namesList = Array.isArray(names) ? names : [names];
    const namesElements = namesList.reduce((a, name, i) => {
      /* eslint-disable no-nested-ternary */
      const separator = i === 0 ? '' : i === namesList.length - 1 ? ' and ' : ', ';
      const location = name.location && (
        <Fragment>
          {' '}
          {name.location}
        </Fragment>
      );
      const author = name.url ? (
        <Fragment key={`author-${name.name}`}>
          <a href={name.url} className="o-typography-author">
            {name.name}
          </a>
          {location}
        </Fragment>
      ) : (
        <Fragment key={`author-${name.name}`}>
          <span>
            {name.name}
          </span>
          {location}
        </Fragment>
      );
      return a.concat(separator, author);
    }, []);
    const dateElement = (
      <Fragment>
        {' '}
        <span
          ref={this.dateRef}
          data-o-component="o-date"
          className="o-date o-typography-timestamp"
          dateTime={date}
          suppressHydrationWarning
        >
          {ftdate(new Date(date))}
        </span>
      </Fragment>
    );
    return (
      <div className="byline">
        {names && namesElements}
        {date && dateElement}
      </div>
    );
  }
}

class ArticleHead extends PureComponent {
  static displayName = 'GArticleHead';

  render() {
    const {
      topic,
      headline,
      summary,
      relatedArticle,
      mainImage,
      flags,
      bylines,
      ...props
    } = this.props;

    // These really mess with Storyshots' snapshot testing
    const buildTime = this.props.buildTime || new Date().toISOString(); // eslint-disable-line
    const publishedDate = this.props.publishedDate || new Date().toISOString(); // eslint-disable-line

    return (
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
          {' '}
          {relatedArticle && (
            <a href={relatedArticle.url} className="o-typography-link">
              {relatedArticle.text}
            </a>
          )}
        </div>
        <meta itemProp="dateModified" content={buildTime} suppressHydrationWarning />

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

        <Byline names={bylines} date={publishedDate} />
      </Fragment>
    );
  }
}

ArticleHead.propTypes = {
  flags: PropTypes.shape({}).isRequired,
  headline: PropTypes.string.isRequired,
  summary: PropTypes.string,
  mainImage: mainImagePropType,
  relatedArticle: PropTypes.shape({}),
  publishedDate: PropTypes.string,
  buildTime: PropTypes.string,
  topic: topicPropType,
  bylines: BylinesPropType,
};

ArticleHead.defaultProps = {
  mainImage: {
    uuid: 'f07ccec8-7ded-11e8-af48-190d103e32a4',
  },
  relatedArticle: {},
  publishedDate: false,
  buildTime: false,
  summary: '',
  topic: {},
  bylines: [],
};

export default ArticleHead;
