import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../components/loader/loader.component';

import { getUserStripeAccountStatus } from '../../utils/stripe/stripe';
import { updateCurrentUserInLocalStorage } from '../../redux/user/user.actions';

const StripeCallback = ({ history }) => {
  const { currentUser } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserAccountStatus = async () => {
      try {
        const res = await getUserStripeAccountStatus(currentUser.token);
        updateCurrentUserInLocalStorage(res.data, () => {
          dispatch({
            type: 'USER_SIGN_IN',
            payload: res.data,
          });
          window.location.href = '/dashboard/my/resources';
        });
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.token) getUserAccountStatus();
  }, [currentUser, dispatch]);
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='max-w-3xl mx-auto'>
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
              <div>
                <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-radial from-indigo-500 to-indigo-700'>
                  <Loader size={24} />
                </div>
                <div className='mt-3 text-center sm:mt-5'>
                  <h3
                    className='text-lg leading-6 font-medium text-gray-900'
                    id='modal-headline'
                  >
                    Redirection dans 2 secondes
                  </h3>
                  <div className='mt-2'>
                    <blockquote>
                      <p className='font-hind text-sm text-fiord italic'>
                        Nul n'est heureux que le gourmand
                      </p>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div className='mt-5 sm:mt-4 text-center text-lg'>🧁</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCallback;
