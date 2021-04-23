import React from 'react';
import { connect } from 'react-redux';
import { Disclosure } from '@headlessui/react';

import { MENU_LINKS, USER_MENU } from '../../utils/constants';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CustomLink from '../custom-link/custom-link.component';

const MobileHeader = ({ currentUser }) => {
  return (
    <Disclosure.Panel className={`lg:hidden`}>
      <div className='pt-2 pb-3 space-y-1'>
        {MENU_LINKS.map((link) => {
          const { id, text, url } = link;
          return (
            <CustomLink key={id} url={url} type='nav'>
              {text}
            </CustomLink>
          );
        })}
      </div>
      <div className='pt-4 pb-3 border-t border-gray-200'>
        <div className='flex items-center px-4'>
          <div className='flex-shrink-0'>
            <img
              className='h-10 w-10 rounded-full'
              src={currentUser && currentUser.photoURL}
              alt={currentUser && currentUser.displayName}
            />
          </div>
          <div className='ml-3'>
            <div className='text-base font-medium text-gray-800'>
              {currentUser && currentUser.displayName}
            </div>
            <div className='text-sm font-medium text-gray-500'>
              {currentUser && currentUser.email}
            </div>
          </div>
          <CartIcon custom={'ml-auto'} />
        </div>
        <div className='mt-3 space-y-1'>
          {USER_MENU.map((link) => {
            const { id, text, url } = link;
            return (
              <CustomLink
                key={id}
                url={url}
                custom='block capitalize px-4 py-2 text-base font-medium text-blue-gray-500 hover:text-blue-gray-800 hover:bg-blue-gray-100'
              >
                {text}
              </CustomLink>
            );
          })}
          <CustomLink
            type='button'
            onClick={() => auth.signOut()}
            custom='text-base font-medium text-blue-gray-500 hover:text-blue-gray-800 hover:bg-blue-gray-100'
          >
            Sign out
          </CustomLink>
        </div>
      </div>
    </Disclosure.Panel>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

export default connect(mapStateToProps)(MobileHeader);
