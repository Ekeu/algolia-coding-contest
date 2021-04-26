import React from 'react';
import { ScaleIcon, RefreshIcon, CogIcon } from '@heroicons/react/solid';

import Loader from '../loader/loader.component';

const SellerCard = ({
  status,
  name,
  amount,
  content,
  onClick,
  linkText,
  loading,
  loaderPrimaryColor,
  loaderSecondaryColor,
  loaderHeight,
  loaderWidth,
  loaderBackgroundColor,
}) => {
  let bottomCardBg;
  let textColor;

  if (status === 'pending') {
    bottomCardBg = 'from-orange-400 to-pink-600';
    textColor = 'text-orange-300';
  }
  if (status === 'balance') {
    bottomCardBg = 'from-green-400 to-cyan-500';
    textColor = 'text-green-300';
  }
  if (status === 'settings') {
    bottomCardBg = 'from-purple-500 to-indigo-500';
    textColor = 'text-purple-300';
  }
  return (
    <div className='bg-white overflow-hidden shadow rounded-lg font-hind'>
      <div className='p-5'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            {status === 'balance' && (
              <ScaleIcon
                className={`h-6 w-6 ${textColor}`}
                aria-hidden='true'
              />
            )}
            {status === 'pending' && (
              <RefreshIcon
                className={`h-6 w-6 ${textColor}`}
                aria-hidden='true'
              />
            )}
            {status === 'settings' &&
              (loading ? (
                <Loader
                  primaryColor={loaderPrimaryColor}
                  secondaryColor={loaderSecondaryColor}
                  height={loaderHeight}
                  width={loaderWidth}
                  backgroundColor={loaderBackgroundColor}
                />
              ) : (
                <CogIcon
                  className={`h-6 w-6 ${textColor}`}
                  aria-hidden='true'
                />
              ))}
          </div>
          <div className='ml-5 w-0 flex-1'>
            <dl>
              <dt className={`text-sm font-medium text-blue-gray-600 truncate`}>
                {name}
              </dt>
              <dd>
                <div className='text-lg font-medium text-blue-gray-900'>
                  {loading ? 'Please wait...' : amount || content}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div
        onClick={onClick}
        style={{
          cursor: loading ? 'not-allowed' : undefined,
        }}
        className={`bg-gradient-to-br ${textColor} ${bottomCardBg} ${
          onClick && 'cursor-pointer'
        } px-5 ${linkText ? 'py-3' : 'py-6'}`}
      >
        <div className='text-base'>
          <span className='font-semibold text-white capitalize'>
            {linkText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
