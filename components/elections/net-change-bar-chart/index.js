/**
 * @file
 * Net change bar chart component
 * @tags ge2019
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPartyInfo } from '../utils';
import './styles.scss';

const NetChangeBarChart = ({ className }) => <div className={className}></div>;

NetChangeBarChart.propTypes = {
  className: PropTypes.string,
};

NetChangeBarChart.defaultProps = {
  className: 'g-net-change-bar-chart',
};

export default NetChangeBarChart;
