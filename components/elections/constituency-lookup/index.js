/**
 * @file
 * UK constituency lookup component
 */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ConstituencyLookup = ({ className }) => <div className={className} />;

ConstituencyLookup.displayName = 'GConstituencyLookup';

ConstituencyLookup.propTypes = {
  className: PropTypes.string,
};

ConstituencyLookup.defaultProps = {
  className: 'g-constituency-lookup',
};

export default ConstituencyLookup;
