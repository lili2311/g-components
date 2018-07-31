/**
 * @file
 * Main HTML metatags and such
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Analytics from './analytics';
import { TopAd } from './ads';
import { getMainImage } from '../helpers';
import {
  flagsPropType,
  StringBoolPropType,
  mainImagePropType,
  trackingPropType,
  topicPropType,
} from '../helpers/proptypes';

// Disables warning for dangerouslySetInnerHTML because we kiiiiinda need it here.
/* eslint-disable react/no-danger */

const HtmlHead = ({
  flags,
  ads,
  description,
  facebookDescription,
  facebookHeadline,
  facebookImage,
  headline,
  mainImage,
  socialDescription,
  socialHeadline,
  socialImage,
  stylesheets,
  summary,
  title,
  topic,
  tracking,
  twitterCard,
  twitterCreator,
  twitterDescription,
  twitterHeadline,
  twitterImage,
  url,
}) => {
  // This is not the way to bundle dependencies... :weary:
  const origamiBuildServiceCSS = [
    'o-normalise@^1.5.3',
    'o-fonts@^3.0.4',
    'o-grid@^4.3.7',
    'o-typography@^5.4.2',
    'o-header@^7.2.8',
    'o-footer@^6.0.8',
    'o-teaser@^2.2.2',
    flags.comments && 'o-comments@^4.0.7',
    flags.shareButtons && 'o-share@^6.1.0',
    flags.ads && 'o-ads@^8.0.0',
  ]
    .filter(i => i)
    .join(',');

  const origamiBuildServiceJS = [
    'o-header@^7.2.8',
    'o-footer@^6.0.8',
    'o-date@^2.10.3',
    'o-errors@^3.6.1',
    'o-teaser@^2.2.2',
    flags.comments && 'o-comments@^4.0.7',
    flags.shareButtons && 'o-share@^6.1.0',
    flags.analytics && 'o-tracking@^1.2.3',
    flags.ads && 'o-ads@^8.0.0',
  ]
    .filter(i => i)
    .join(',');

  const polyfillFeatures = ['default', 'fetch'].join(',');
  const mainImageUrl = getMainImage(mainImage);
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* resource hints */}
      <link rel="preconnect" href="https://www.ft.com" />
      <link rel="preconnect" href="https://cdn.polyfill.io" />

      {/* Stylesheets */}
      <link
        rel="stylesheet"
        href={`https://www.ft.com/__origami/service/build/v2/bundles/css?modules=${origamiBuildServiceCSS}`}
      />

      {stylesheets && stylesheets.map(stylesheet => <link rel="stylesheet" href={stylesheet} />)}

      <link href="https://plus.google.com/113457471429583444041/" rel="publisher" />
      <meta property="fb:app_id" content="429755910551755" />
      <link
        rel="icon"
        type="image/png"
        href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=32&height=32&format=png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=194&height=194&format=png"
        sizes="194x194"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="https://www.ft.com/__origami/service/image/v2/images/raw/ftlogo-v1%3Abrand-ft-logo-square-coloured?source=update-logos&width=180&height=180&format=png"
      />
      <meta name="format-detection" content="telephone=no" />
      <meta name="robots" content="index,follow" />
      <meta name="copyright" content="Financial Times" />
      <meta name="theme-color" content="#fff1e5" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'WebSite',
            name: 'Financial Times',
            alternateName: 'FT.com',
            url: 'http://www.ft.com',
          }),
        }}
      />
      {topic.name
        && topic.url && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    item: {
                      '@id': topic.url,
                      name: topic.name,
                      image: getMainImage(mainImage),
                    },
                  },
                ],
              }),
            }}
          />
      )}

      {flags.errorReporting && (
        <script
          type="application/json"
          data-o-errors-config
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              sentryEndpoint: 'https://ddbd80489ff549538250bbe37fa52bbd@sentry.io/71130',
            }),
          }}
        />
      )}

      {/* Prioritised JavaScript */}

      {/* Add polyfill service */}
      <script src={`https://cdn.polyfill.io/v2/polyfill.min.js?features=${polyfillFeatures}`} />

      {/* Add CTM checks */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          cutsTheMustard = 'querySelector' in document && 'localStorage' in window &&
          'addEventListener' in window && typeof Function.prototype.bind !== 'undefined'; if
          (cutsTheMustard) document.documentElement.className =
          document.documentElement.className.replace( /core/g, 'enhanced', );
          `,
        }}
      />

      {flags.analytics && (
        <Fragment>
          <link rel="preconnect" href="https://spoor-api.ft.com" />
          <meta property="ft.track:is_live" content="true" />
          {tracking.product && <meta property="ft.track:product" content="tracking.product" />}
          {tracking.micrositeName && (
            <meta property="ft.track:microsite_name" content="tracking.micrositeName" />
          )}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              function oTrackinginit() {
                var oTracking = Origami['o-tracking'];

                var page_data = {
                  content: { asset_type: 'interactive' },
                };

                var properties = [].reduce.call(
                  document.querySelectorAll('head meta[property^="ft.track:"]') || [],
                  function(o, el) {
                    o[el.getAttribute('property').replace('ft.track:', '')] = el.getAttribute('content');
                    return o;
                  },
                  {},
                );

                var id = document.documentElement.getAttribute('data-content-id');

                if (id) {
                  page_data.content.uuid = id;
                }

                if (properties.microsite_name) {
                  page_data.microsite_name = properties.microsite_name;
                }

                // Setup
                oTracking.init({
                  server: 'https://spoor-api.ft.com/px.gif',
                  system: {
                    is_live: typeof properties.is_live === 'string' ? properties.is_live.toLowerCase() : false,
                  },
                  context: { product: properties.product || 'IG' },
                });

                // Page
                oTracking.page(page_data);

                // Links
                oTracking.link.init();
              }
              `,
            }}
          />
        </Fragment>
      )}

      {/* Add Origami Build Service */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
      (function(src) {
        if (cutsTheMustard) {
          var o = document.createElement('script');
          o.async = o.defer = true;
          o.src = src;
          var s = document.getElementsByTagName('script')[0];

          ${
            flags.analytics
              ? `
            if (o.hasOwnProperty('onreadystatechange')) {
                o.onreadystatechange = function() {
                    if (o.readyState === "loaded") {
                        oTrackinginit();
                    }
                };
            } else {
                o.onload = oTrackinginit;
            }
            `
              : ''
          }
          s.parentNode.insertBefore(o, s);
        }
      }('https://www.ft.com/__origami/service/build/v2/bundles/js?modules=${origamiBuildServiceJS}'))`,
        }}
      />

      <title>
        {title || headline}
      </title>
      <meta name="twitter:title" content={twitterHeadline || socialHeadline || headline} />
      <meta property="og:title" content={facebookHeadline || socialHeadline || headline} />

      <meta name="description" content={description || summary} />
      <meta
        name="twitter:description"
        content={twitterDescription || socialDescription || description || summary}
      />
      <meta
        property="og:description"
        content={facebookDescription || socialDescription || description || summary}
      />

      <link rel="canonical" href={url} />
      <meta name="twitter:url" content={url} />
      <meta property="og:url" content={url} />
      {mainImageUrl && <link rel="image_src" href={mainImageUrl} />}
      {(twitterImage || socialImage || mainImageUrl) && (
        <meta name="twitter:image" content={twitterImage || socialImage || mainImageUrl} />
      )}
      {(facebookImage || socialImage || mainImageUrl) && (
        <meta property="og:image" content={facebookImage || socialImage || mainImageUrl} />
      )}

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@FinancialTimes" />

      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

      {/* open graph tags for Financial Times, FT World News, Financial Times Italy,
        FT MBA and FT Health */}
      <meta property="fb:pages" content="8860325749" />
      <meta property="fb:pages" content="121862597867466" />
      <meta property="fb:pages" content="622419751233155" />
      <meta property="fb:pages" content="23117544640" />
      <meta property="fb:pages" content="293710391064899" />

      {flags.ads && (
        <script
          data-o-ads-config=""
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              gpt: {
                network: 5887,
                site: ads.gptSite,
                zone: ads.gptZone,
              },
              dfp_targeting: ads.dfpTargeting,
            }),
          }}
        />
      )}
      {flags.analytics && <Analytics />}
      {flags.ads && <TopAd />}
    </head>
  );
};

HtmlHead.propTypes = {
  ads: PropTypes.shape({
    gptSite: PropTypes.string.isRequired,
    gptZone: StringBoolPropType.isRequired,
    dfpTargeting: StringBoolPropType.isRequired,
  }),
  description: PropTypes.string,
  facebookDescription: PropTypes.string,
  facebookHeadline: PropTypes.string,
  facebookImage: PropTypes.string,
  flags: flagsPropType,
  headline: PropTypes.string.isRequired,
  mainImage: mainImagePropType,
  socialDescription: PropTypes.string,
  socialHeadline: PropTypes.string,
  socialImage: PropTypes.string,
  stylesheets: PropTypes.arrayOf(PropTypes.string),
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  topic: topicPropType,
  tracking: trackingPropType,
  twitterCard: PropTypes.string,
  twitterCreator: PropTypes.string,
  twitterDescription: PropTypes.string,
  twitterHeadline: PropTypes.string,
  twitterImage: PropTypes.string,
  url: PropTypes.string.isRequired,
};

const DEFAULTS = {
  headline: 'New Starter Kit Project',
  desc: 'A Starter Kit page',
};

HtmlHead.defaultProps = {
  ads: {
    gptSite: 'ft.com', // Ad unit hierarchy makes ads more granular.
    gptZone: false, // Start with ft.com and /companies /markets /world as appropriate to your story
    dfpTargeting: false, // granular targeting is optional and will be specified by the ads team
  },
  mainImage: {
    uuid: 'f07ccec8-7ded-11e8-af48-190d103e32a4',
  },
  flags: {},
  topic: {},
  description: DEFAULTS.desc,
  facebookDescription: '',
  facebookHeadline: '',
  facebookImage: '',
  twitterCard: '',
  twitterCreator: '',
  twitterDescription: '',
  twitterHeadline: '',
  twitterImage: '',
  socialDescription: '',
  socialHeadline: '',
  socialImage: '',
  stylesheets: [],
  summary: '',
  tracking: {
    product: 'IG',
  },
};

export default HtmlHead;
