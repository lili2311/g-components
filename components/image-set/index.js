import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

class ImageSet extends PureComponent {
  static propTypes = {
    graphicsData: PropTypes.object,
  };

  static defaultProps = {
    graphicsData: {
      alt: '',
      sources: {},
    },
  };

  render() {
    const { graphicsData } = this.props;

    return (
      <div className="g-imageset">
        <figure>
          <picture>
            <source
              media="screen and (max-width: 490px)"
              srcSet={`https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F${
                graphicsData.sources.small
              }?source=ig&amp;fit=scale-down&amp;quality=highest&amp;width=490`}
            />
            <source
              media="screen and (min-width: 980px)"
              srcSet={`https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F${
                graphicsData.sources.large
              }?source=ig&amp;fit=scale-down&amp;quality=highest&amp;width=1260`}
            />
            <img
              src={`https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-eu.s3.amazonaws.com%2F${
                graphicsData.sources.medium
              }?source=ig&amp;fit=scale-down&amp;quality=highest&amp;width=700`}
              alt={graphicsData.alt}
            />
          </picture>
        </figure>
      </div>
    );
  }
}

export default ImageSet;
