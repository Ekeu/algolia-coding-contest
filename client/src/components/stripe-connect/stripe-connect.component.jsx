import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { greeting } from '../../utils/functions/greeting';
import {
  UserGroupIcon,
  AtSymbolIcon,
  ScaleIcon,
  PlusIcon,
  CreditCardIcon,
} from '@heroicons/react/solid';

import CustomLink from '../custom-link/custom-link.component';

const StripeConnect = () => {
  const { currentUser } = useSelector((state) => ({ ...state }));
  const cards = [
    {
      name: 'Account balance',
      href: '#',
      icon: ScaleIcon,
      amount: '$30,659.45',
    },
    // More items...
  ];
  return (
    <main className='flex-1 relative pb-8 z-0 overflow-y-auto'>
      <div className='bg-white'>
        <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
          <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
            <div className='flex-1 min-w-0'>
              {/* Profile */}
              <div className='flex items-center'>
                <img
                  className='hidden h-16 w-16 rounded-full sm:block'
                  src={currentUser?.photoURL}
                  alt={currentUser?.userName}
                />
                <div>
                  <div className='flex items-center'>
                    <img
                      className='h-16 w-16 rounded-full sm:hidden'
                      src={currentUser?.photoURL}
                      alt={currentUser?.userName}
                    />
                    <h1 className='ml-3 text-3xl font-hind font-bold leading-7 text-gray-900 sm:leading-9 tracking-tight sm:truncate'>
                      {greeting(currentUser?.userName)}
                    </h1>
                  </div>
                  <dl className='mt-6 flex flex-col font-hind sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap'>
                    <dt className='sr-only'>Email</dt>
                    <dd className='flex items-center text-sm text-gray-500 font-medium sm:mr-6'>
                      <AtSymbolIcon
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      {currentUser?.email}
                    </dd>
                    <dt className='sr-only'>Membership</dt>
                    <dd className='mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0'>
                      <UserGroupIcon
                        className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      Joined {moment(currentUser?.createdAt).fromNow()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className='mt-6 font-hind flex space-x-3 md:mt-0 md:ml-4'>
              {currentUser?.stripe_seller?.charges_enabled ? (
                <CustomLink
                  type='link-button'
                  url='/hotels/new'
                  customStyles='px-4 py-2 border border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none'
                >
                  <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
                  Add Hotel
                </CustomLink>
              ) : (
                <CustomLink
                  type='link-button'
                  url='/connect'
                  customStyles='px-4 py-2 border border-gray-300 font-medium text-gray-700 bg-white hover:bg-gray-50'
                >
                  <CreditCardIcon
                    className='-ml-1 mr-2 h-5 w-5'
                    aria-hidden='true'
                  />
                  Connect to Stripe
                </CustomLink>
              )}
              <CustomLink
                type='link-button'
                url={'/'}
                customStyles='px-4 py-2 border border-transparent font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-700'
              >
                Explore Unity
              </CustomLink>
            </div>
          </div>
        </div>
      </div>

      {currentUser?.stripe_seller?.charges_enabled && (
        <div className='mt-8'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>
              Overview
            </h2>
            <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {/* Card */}
              {cards.map((card) => (
                <div
                  key={card.name}
                  className='bg-white overflow-hidden shadow rounded-lg'
                >
                  <div className='p-5'>
                    <div className='flex items-center'>
                      <div className='flex-shrink-0'>
                        <card.icon
                          className='h-6 w-6 text-gray-400'
                          aria-hidden='true'
                        />
                      </div>
                      <div className='ml-5 w-0 flex-1'>
                        <dl>
                          <dt className='text-sm font-medium text-gray-500 truncate'>
                            {card.name}
                          </dt>
                          <dd>
                            <div className='text-lg font-medium text-gray-900'>
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 px-5 py-3'>
                    <div className='text-sm'>
                      <a
                        href={card.href}
                        className='font-medium text-cyan-700 hover:text-cyan-900'
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StripeConnect;
