import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPartyInfo } from '../utils';
import './styles.scss';

const SeatsBarChart = ({ className, title, tableHeaders, data, majority }) => {
  const tableData = data.filter(({ isInTable }) => isInTable);
  const footnoteData = data.filter(({ isInTable }) => !isInTable);

  const maxSeats = tableData.reduce((acc, { projectedSeats }) => Math.max(acc, projectedSeats), 0);
  const maxValue = Math.max(majority, maxSeats);
  const calcPercentage = seats => (seats / maxValue) * 100;

  return (
    <div className={className}>
      <h3 className={`${className}__title`}>{title}</h3>
      <table className={`${className}__table`}>
        <thead>
          <tr>
            {tableHeaders.map(t => (
              <th key={`th_${t}`}>{t}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map(({ party, seats, projectedSeats, voteShare, isOthers }) => {
            const { shortName, color } = getPartyInfo(party);
            return (
              <tr>
                <td className={`party${isOthers ? ' party--others' : ''}`}>
                  <span className="party-badge" style={{ backgroundColor: color }} />
                  <span className="party-bar-container">
                    <span
                      className="party-bar"
                      style={{
                        backgroundColor: color,
                        width: `${calcPercentage(projectedSeats)}%`,
                      }}
                    />
                    {false && <span className="party-name">{shortName}</span>}
                  </span>
                </td>
                <td className="seats">{seats}</td>
                <td className="voteshare">{voteShare.toFixed(1)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={`${className}__footnote`}>
        {footnoteData.map(({ party, seats }, index, arr) => {
          const { shortName, color } = getPartyInfo(party);
          return (
            <Fragment>
              {shortName} (<span className="seats">{seats}</span>)
              {index !== arr.length - 1 ? ', ' : ''}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

SeatsBarChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      party: PropTypes.string,
      seats: PropTypes.number,
      projectedSeats: PropTypes.number,
      voteShare: PropTypes.number,
      isOthers: PropTypes.bool.isOptional,
      isInTable: PropTypes.bool,
    }),
  ).isRequired,
  majority: PropTypes.number,
};

SeatsBarChart.defaultProps = {
  className: 'g-seats-bar-chart',
  title: 'Number of seats won',
};

export default SeatsBarChart;
