import React, { forwardRef } from 'react';

import Loader from '../loader/loader.component';

const CustomButton = forwardRef(
  (
    {
      children,
      customStyles,
      addStyles,
      loading,
      style,
      disabled,
      loaderPrimaryColor,
      loaderSecondaryColor,
      loaderHeight,
      loaderWidth,
      loaderBackgroundColor,
      ...otherProps
    },
    ref
  ) => (
    <button
      ref={ref}
      {...otherProps}
      style={{
        cursor: loading || disabled ? 'not-allowed' : undefined,
        ...style,
      }}
      disabled={disabled}
      className={`${
        customStyles
          ? customStyles
          : 'border-transparent text-white bg-gradient-to-r from-indigo-500 to-indigo-700'
      } w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-base font-medium focus:outline-none ${addStyles}`}
    >
      {loading ? (
        <Loader
          primaryColor={loaderPrimaryColor}
          secondaryColor={loaderSecondaryColor}
          height={loaderHeight}
          width={loaderWidth}
          backgroundColor={loaderBackgroundColor}
        />
      ) : (
        children
      )}
    </button>
  )
);

export default CustomButton;
