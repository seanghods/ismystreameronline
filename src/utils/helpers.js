import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function removeUndefinedValues(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value !== undefined) // eslint-disable-line no-unused-vars
    .reduce((newObj, [key, value]) => ({ ...newObj, [key]: value }), {});
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function convertToK(number) {
  if (number < 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return Math.round(number / 1000) + 'K';
  }
}
