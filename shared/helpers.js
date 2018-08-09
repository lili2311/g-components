/**
 * @file
 * Various helper functions
 */

import React from 'react';
import removeMarkdown from 'remove-markdown';
import { utcFormat } from 'd3-time-format';

const formatterCache = new Map();
const defaultFTDateFormat = '%A, %-e %B %Y';

export function isotime(date) {
  if (!date) {
    return '';
  }
  if (!(date instanceof Date)) {
    return date;
  }

  return date.toISOString();
}

// strftime format docs: https://github.com/d3/d3-time-format
export function strftime(format = defaultFTDateFormat) {
  if (formatterCache.has(format)) {
    return formatterCache.get(format);
  }

  const fm = utcFormat(format);
  formatterCache.set(format, fm);
  return fm;
}

export function ftdate(d) {
  return strftime()(d);
}

export function plain(str, stripListLeaders = true) {
  return removeMarkdown(str, { stripListLeaders, gfm: true });
}

export function encodedJSON(_data) {
  const data = _data instanceof String ? JSON.parse(_data) : _data;
  try {
    return encodeURIComponent(JSON.stringify(data, null, ''));
  } catch (e) {
    return '';
  }
}

export function spoorTrackingPixel(data) {
  const jsonString = encodedJSON(data);
  if (document) {
    const ieVersion = document.documentMode ? document.documentMode : 99; // eslint-disable-line
    const img = `<img src="https://spoor-api.ft.com/px.gif?data=${jsonString}" height="1" width="1" />`;
    return ieVersion < 9 ? img : (
      <noscript data-o-component="o-tracking">
        {img}
      </noscript>
    );
  }

  return null;
}

export function imageUUID(uuid) {
  return `https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A${uuid}?source=ig`;
}

export function getMainImage(img = {}) {
  if (Object.prototype.hasOwnProperty.call(img, 'uuid')) return imageUUID(img.uuid);
  if (Object.prototype.hasOwnProperty.call(img, 'url')) return img.url;
  return '';
}

// eslint-disable-next-line no-nested-ternary
export const getSeparator = (idx, arr) => (arr.length > 1 ? (idx !== arr.length - 1 ? ', ' : ' ') : ' ');

// Via: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html

export const makeCancelable = (promise) => {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    /* eslint-disable prefer-promise-reject-errors */
    promise.then(
      val => (hasCanceled ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled ? reject({ isCanceled: true }) : reject(error)),
    );
    /* eslint-enable */
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
};
