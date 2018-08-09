/**
 * @file
 * Reusable proptypes
 */

import PropTypes from 'prop-types';

export const StringBoolPropType = PropTypes.oneOfType([PropTypes.string, PropTypes.bool]);

export const flagsPropType = PropTypes.shape({
  prod: StringBoolPropType.isRequired,
  errorReporting: StringBoolPropType.isRequired,
  analytics: StringBoolPropType.isRequired,
  googleAnalytics: StringBoolPropType.isRequired,
  ads: StringBoolPropType.isRequired,
  onwardjourney: StringBoolPropType.isRequired,
  shareButtons: StringBoolPropType.isRequired,
  header: StringBoolPropType.isRequired,
  footer: StringBoolPropType.isRequired,
  comments: StringBoolPropType.isRequired,
});

export const mainImagePropType = PropTypes.oneOfType([
  PropTypes.shape({
    uuid: PropTypes.string.isRequired,
  }),
  PropTypes.shape({
    url: PropTypes.string.isRequired,
  }),
]);

export const trackingPropType = PropTypes.shape({
  micrositeName: PropTypes.string,
  product: PropTypes.string,
});

export const topicPropType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export default '';
