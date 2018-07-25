/**
 * @file
 * OnwardJourney component
 */

import React from 'react';
import PropTypes from 'prop-types';

class OnwardJourney extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
    };
  }

  async componentWillMount() {
    const { urlBase, layout, relatedContent } = this.props;

    const sections = await Promise.all(
      relatedContent.map(({ list, rows = 1 }) => {
        const limit = rows * 4;
        const url = `${urlBase}${list}/html/${layout}?limit=${limit}`;
        return fetch(url).then(res => res.text());
      }),
    );
    this.setState({ sections });
  }

  render() {
    const { sections } = this.state;
    return sections.map((section, idx) => (
      <section
        key={idx} // eslint-disable-line react/no-array-index-key
        className="onward-journey__section"
        data-g-component="onward-journey"
        dangerouslySetInnerHTML={{ __html: section }} // eslint-disable-line react/no-danger
      />
    ));
  }
}

OnwardJourney.propTypes = {
  relatedContent: PropTypes.arrayOf(
    PropTypes.shape({
      rows: PropTypes.number.isRequired,
      list: PropTypes.string,
    }),
  ),
  urlBase: PropTypes.string,
  layout: PropTypes.string,
};

OnwardJourney.defaultProps = {
  relatedContent: [],
  urlBase: 'https://ig.ft.com/onwardjourney/v3/',
  layout: '',
};

export default OnwardJourney;
