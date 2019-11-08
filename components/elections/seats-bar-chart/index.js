import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const SeatsBarChart = ({ className, title, tableHeaders, data }) => (
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
        {data.map(d => {
          console.log(d);
          return (
            <tr>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

SeatsBarChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      party: PropTypes.string,
      seats: PropTypes.number,
      voteShare: PropTypes.number,
      projectedVoteShare: PropTypes.number,
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
