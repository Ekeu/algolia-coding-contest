import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const CustomLink = ({ url, customStyles, children, type, ...otherProps }) => {
  const location = useLocation();
  const { pathname } = location;

  let Component;
  if (type === 'button') {
    Component = (
      <button
        {...otherProps}
        className={`w-full text-left px-4 py-2 ${
          customStyles
            ? customStyles
            : 'text-sm text-gray-700 hover:bg-gray-100'
        } font-hind focus:outline-none`}
      >
        {children}
      </button>
    );
  } else if (type === 'link-button') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${customStyles} inline-flex items-center justify-center rounded-md shadow-sm font-hind  focus:outline-none`}
      >
        {children}
      </Link>
    );
  } else if (type === 'nav') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${
          pathname === url
            ? 'border-indigo-500 text-blue-gray-900 '
            : 'border-transparent text-blue-gray-500 hover:border-blue-gray-300 hover:text-blue-gray-700'
        } inline-flex items-center px-1 pt-1 border-b-2 capitalize text-sm font-medium font-hind`}
      >
        {children}
      </Link>
    );
  } else if (type === 'mobile') {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`${
          pathname === url
            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
            : 'border-transparent text-blue-gray-600 hover:bg-blue-gray-50 hover:border-blue-gray-300 hover:text-blue-gray-800'
        } block pl-3 pr-4 py-2 border-l-4 text-base font-medium font-hind`}
      >
        {children}
      </Link>
    );
  } else {
    Component = (
      <Link
        to={url}
        {...otherProps}
        className={`block px-4 py-2 ${
          customStyles
            ? customStyles
            : 'text-sm text-blue-gray-700 hover:bg-blue-gray-100'
        } font-hind`}
      >
        {children}
      </Link>
    );
  }
  return Component;
};

CustomLink.propTypes = {
  url: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default CustomLink;
