/**
 * @file
 * Responsive image set
 */

import React from 'react';
import PropTypes from 'prop-types';

function imageUUID(uuid, width) {
  return `https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F${uuid}?source=ig&amp;fit=scale-down&amp;quality=highest&amp;width=${width}`;
}

function imageURL(url, width) {
  return `https://www.ft.com/__origami/service/image/v2/images/raw/${url}?source=ig&amp;fit=scale-down&amp;quality=highest&amp;width=${width}`;
}

function getImageURL(imgString, width) {
  if (imgString.indexOf('http') > -1) return imageURL(imgString, width);
  return imageUUID(imgString, width);
}

const imageSet = ({ graphicsData }) => (
  <div className="g-imageset">
    <figure>
      <picture>
        {graphicsData.sources
          && graphicsData.sources.small && (
            <source
              media="screen and (max-width: 490px)"
              srcSet={getImageURL(graphicsData.sources.small, 490)}
            />
        )}
        {graphicsData.sources
          && graphicsData.sources.large && (
            <source
              media="screen and (min-width: 980px)"
              srcSet={getImageURL(graphicsData.sources.large, 1260)}
            />
        )}
        {graphicsData.sources
          && graphicsData.sources.medium && (
            <img srcSet={getImageURL(graphicsData.sources.medium, 700)} alt={graphicsData.alt} />
        )}
      </picture>
    </figure>
  </div>
);

imageSet.propTypes = {
  graphicsData: PropTypes.objectOf({
    alt: PropTypes.string.isRequired,
    sources: PropTypes.objectOf({
      small: PropTypes.string,
      medium: PropTypes.string,
      large: PropTypes.string,
    }).isRequired,
  }),
};

imageSet.defaultProps = {
  graphicsData: {},
};

export default imageSet;
