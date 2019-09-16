/**
 * @file
 * Tooltip component wrapping o-tooltip
 */

import React, { useEffect, useState } from 'react';
import OTooltip from 'o-tooltip';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import './styles.scss';

const Tooltip = ({
  className, children, left, top, ...props
}) => (
  <div className={cx(className, 'g-tooltip')} style={left, top}>
    <div className={cx(className, 'g-tooltip--content')}>
    {children}
    </div>
    </div>
);
