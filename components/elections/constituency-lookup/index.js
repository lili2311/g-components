/**
 * @file
 * UK constituency lookup component
 */

import React from 'react';
import PropTypes from 'prop-types';
import AutosuggestSearch from '../../autosuggest-search';
import './styles.scss';

const ConstituencyLookup = ({ className, title, subhead }) => (
  <div className={className}>
    <h2 className={`${className}__title`}>{title}</h2>
    <h3 className={`${className}__subhead`}>{subhead}</h3>
    <AutosuggestSearch
      placeholder="Search"
      width={'100%'}
      searchList={[
        { value: 'jeremycorbyn', display: 'Jeremy Corbyn' },
        { value: 'borisjohnson', display: 'Boris Johnson' },
        { value: 'joswinson', display: 'Jo Swinson' },
      ]}
      validateInput={input => {
        if (input === '') {
          return { isError: true, errorMessage: 'ERROR!' };
        }
        return { isError: false, errorMessage: '' };
      }}
    />
  </div>
);

ConstituencyLookup.displayName = 'GConstituencyLookup';

ConstituencyLookup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subhead: PropTypes.string,
};

ConstituencyLookup.defaultProps = {
  className: 'g-constituency-lookup',
  title: 'Results by constituency',
  subhead: 'Search by constituency name or postcode',
};

export default ConstituencyLookup;
