import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/unity-logo.svg';

import SearchInput from '../search-input/search-input.component';
import CustomLink from '../custom-link/custom-link.component';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ currentUser }) => {
  return (
    <Disclosure as='nav' className='bg-white shadow'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex px-2 lg:px-0'>
                <div className='flex-shrink-0 flex items-center'>
                  <img
                    className='block lg:hidden h-8 w-auto'
                    src={Logo}
                    alt='Unity'
                  />
                  <img
                    className='hidden lg:block h-8 w-auto'
                    src={Logo}
                    alt='Unity'
                  />
                </div>
                <div className='hidden lg:ml-6 lg:flex lg:space-x-8'>
                  <CustomLink url='/' type='nav'>
                    Booking
                  </CustomLink>
                  <CustomLink url='/blog' type='nav'>
                    Blog
                  </CustomLink>
                </div>
              </div>
              <div className='flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end'>
                <SearchInput />
              </div>
              <div className='flex items-center lg:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='hidden lg:flex lg:items-center'>
                {currentUser ? (
                  <Menu as='div' className='ml-4 relative flex-shrink-0'>
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className='bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                            <span className='sr-only'>Open user menu</span>
                            {/* <img
                              className='h-8 w-8 rounded-full'
                              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              alt=''
                            /> */}
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items
                            static
                            className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to='/dashboard'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to='/bookings'
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Settings
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              <CustomLink type='button' role='menuitem'>
                                Sign out
                              </CustomLink>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <CustomLink
                    to='/signin'
                    type='link-button'
                    customStyles='ml-3 px-4 py-2  text-base font-hind font-medium text-white bg-indigo-500 hover:bg-indigo-600'
                  >
                    Sign in
                  </CustomLink>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
