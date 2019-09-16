/**
 * @file
 * Tooltip component wrapping o-tooltip
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import usePortal from 'react-useportal';
import './styles.scss';

const Tooltip = ({ className, children, arrow, left, top }) => {
  const { Portal } = usePortal();
  return (
    <Portal>
      <div
        className={cx(className, 'g-tooltip', arrow && `g-tooltip--${arrow}`)}
        style={{ left, top }}
      >
        <div className={cx(className, 'g-tooltip--content')}>{children}</div>
      </div>
    </Portal>
  );
};

Tooltip.defaultProps = {
  arrow: false,
  className: null,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  arrow: PropTypes.oneOf(['top', 'bottom', 'left', 'right', false]),
};

export default Tooltip;
