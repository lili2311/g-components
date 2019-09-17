/**
 * @file
 * Tooltip component wrapping o-tooltip
 */

import React, { useRef, createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import usePortal from 'react-useportal';
import cx from 'classnames';
import './styles.scss';

const MAGIC_ORIGAMI_HEIGHT = 12; // "12" is the height of tip via Origami docs

export const tooltipContext = createContext({
  top: null,
  left: null,
  visible: false,
  content: '',
  arrow: null,
});

const Tooltip = ({ className }) => {
  const tooltip = useContext(tooltipContext);
  const { arrow, content, visible, target } = tooltip;
  const ref = useRef(null);
  const { Portal } = usePortal();
  const [state, setState] = useState({
    left: null,
    right: null,
    content: '',
    visible: false,
  });

  useEffect(() => {
    if (!ref.current || !target) setState({ ...state, visible: false });
    else {
      const bb = target.getBoundingClientRect();
      const thisBB = ref.current.getBoundingClientRect();
      const newState = {
        visible,
        content,
      };
      switch (arrow) {
        default: // @TODO write a solver that figures out which side has most space
        case 'top':
          newState.left = bb.left - thisBB.width / 2 + bb.width / 2;
          newState.top = target.offsetTop - thisBB.height - MAGIC_ORIGAMI_HEIGHT;
          break;
        case 'bottom':
          newState.left = bb.left - thisBB.width / 2 + bb.width / 2;
          newState.top = target.offsetTop + bb.height + MAGIC_ORIGAMI_HEIGHT;
          break;
        case 'left':
          newState.left = bb.left + bb.width + MAGIC_ORIGAMI_HEIGHT;
          newState.top = target.offsetTop - thisBB.height / 2 + bb.height / 2;
          break;
        case 'right':
          newState.left = bb.left - thisBB.width - MAGIC_ORIGAMI_HEIGHT;
          newState.top = target.offsetTop - thisBB.height / 2 + bb.height / 2;
          break;
      }

      setState(newState);
    }
  }, [arrow, content, state, target, visible]);

  return (
    <Portal>
      <div
        ref={ref}
        className={cx(className, 'g-tooltip', arrow && `g-tooltip--${arrow}`)}
        style={{ left: state.left, top: state.top, display: state.visible ? 'block' : 'none' }}
      >
        <div className={cx(className, 'g-tooltip--content')}>{content}</div>
      </div>
    </Portal>
  );
};

Tooltip.defaultProps = {
  className: null,
};

Tooltip.propTypes = {
  className: PropTypes.string,
};

export default Tooltip;
