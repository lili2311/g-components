/**
 * @file
 * Constituency results table component
 */

import React from 'react';
import PropTypes from 'prop-types';

export const ConstituencyResultsTable = ({ className }) => <div className={className}></div>;

ConstituencyResultsTable.propTypes = {
  className: PropTypes.string,
};

ConstituencyResultsTable.defaultProps = {
  className: 'g-constituency-results-table',
};

export default ConstituencyResultsTable;
