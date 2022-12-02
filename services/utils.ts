/**
 * This file contains several utils functions
 */

import {NextRouter} from 'next/router';

export const getLocaleShort = (router: NextRouter): string => {
  if (!router.locale) {
    return router.defaultLocale.substring(0, 2);
  }

  return router.locale.substring(0, 2);
}



export const getWindowUrl = (): string => {
  return typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'http://localhost';
}


export const displayRef = (ref: string): string => {
  if (ref.length !== 10) {
    throw Error("Unexpected election ref");
  }

  return `${ref.substring(0, 3)}-${ref.substring(3, 6)}-${ref.substring(6)}`
}

export const isEnded = (date: string): boolean => {
  const dateEnd = new Date(date);
  const now = new Date();
  console.log(dateEnd, now)
  return +dateEnd < +now;
}