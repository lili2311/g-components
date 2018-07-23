/**
 * @file
 * Analytics code
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { flagsPropType } from '../proptypes';
import { spoorTrackingPixel } from '../filters';

// Lol this won't work
const Analytics = props => (
  <Fragment>
    {/* Add fallback if browsers don't cut the mustard */}
    {spoorTrackingPixel({
      action: 'view',
      category: 'page',
      context: {
        content: {
          asset_type: 'interactive',
          uuid: props.id,
        },
        product: 'IG',
        microsite_name: props.tracking.micrositeName,
      },
      system: {
        is_live: props.flags.prod,
        apiKey: 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP',
        source: 'o-tracking-ns',
        version: '1.0.0',
      },
    })}
    {props.flags.googleAnalytics && (
      <script>
        {`
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', 'UA-35229645-1', 'auto');
        ga('require','displayfeatures');
        ga('send', 'pageview');
        `}
      </script>
    )}
    {/* Floodlight tracking pixel */}
    <script>
      {`
        var spoorId = /spoor-id=([^;]+)/.exec(document.cookie)[1] || 'cj5y2utdx00003i5z6l6po8c1';
        var endpoint = 'https://4235225.fls.doubleclick.net/activityi;src=4235225;type=homeo886;cat=ft-ne000;u10=' + spoorId + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=' + Date.now() + ';num=1';
        var img = document.createElement('img');
        img.setAttribute('width', 1);
        img.setAttribute('height', 1);
        img.setAttribute('src', endpoint);
        img.style.position = 'absolute';
        document.body.insertBefore(img, document.body.firstElementChild);
        `}
    </script>
  </Fragment>
);

Analytics.propTypes = {
  id: PropTypes.string.isRequired,
  flags: flagsPropType.isRequired,
  tracking: PropTypes.shape({
    micrositeName: PropTypes.string,
  }),
};

export default Analytics;
