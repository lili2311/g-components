/**
 * @file
 * Constituency results table component
 */

import React from 'react';
import PropTypes from 'prop-types';
import { numberWithCommas, getPartyInfo } from '../utils';
import './styles.scss';

export const ConstituencyResultsTable = ({
  className,
  data,
  tableHeaders,
  showAsterickField,
  note,
}) => (
  <div className={className}>
    <table className={`${className}__table`}>
      <thead>
        <tr>
          {tableHeaders.map(t => (
            <th>{t}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(d => {
          const fields = Object.entries(d).filter(([field]) => field !== 'showAsterick');
          const showAsterick = d.showAsterick;
          return (
            <tr>
              {fields.map(([field, value]) => (
                <td>
                  {value}
                  {showAsterickField === field && showAsterick ? '*' : ''}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    {note && <div className={`${className}__note`}>{note}</div>}
  </div>
);

ConstituencyResultsTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.number,
  note: PropTypes.string,
  showAsterickField: PropTypes.string,
};

ConstituencyResultsTable.defaultProps = {
  className: 'g-constituency-results-table',
  width: 500,
};

export default ConstituencyResultsTable;
