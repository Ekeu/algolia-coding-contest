import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { ReactComponent as House } from '../../../assets/images/house.svg';

import CustomButton from '../../../components/custom-button/custom-button.component';
import DashboardNav from '../../../components/navbar/dashboard.navbar.component';
import StripeConnect from '../../../components/stripe-connect/stripe-connect.component';
import Notification from '../../../components/notification/notification.component';

import { stripeConnectAccount } from '../../../utils/stripe/stripe';

const DashboardResources = () => {
  const { currentUser } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const handlePayoutsSetup = async () => {
    try {
      setLoading(true);
      const res = await stripeConnectAccount(currentUser.token);
      window.location.href = res.data;
    } catch (error) {
      setLoading(false);
      toast(
        <Notification error headline='Stripe setup failed!'>
          {error.message}
        </Notification>
      );
    }
  };
  return (
    <div className='min-h-screen bg-white'>
      <div className='relative max-w-7xl mx-auto py-4 px-1 sm:py-8 sm:px-6 lg:px-2'>
        <StripeConnect />
      </div>
      <div className='sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
        <main>
          <div className='px-4 sm:px-0'>
            <div className='sm:block'>
              <DashboardNav />
            </div>
          </div>
          {currentUser?.stripe_seller?.charges_enabled ? (
            <h2>Add a Hotel</h2>
          ) : (
            <div className='relative bg-white py-8 sm:py-12 lg:py-16 mt-4 font-hind'>
              <div className='mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl'>
                <div className='flow-root bg-indigo-50 rounded-lg px-6 pb-8'>
                  <div className='-mt-6'>
                    <div>
                      <span className='inline-flex items-center justify-center bg-white p-3 rounded-md shadow-lg'>
                        <House className='h-32 w-32' aria-hidden='true' />
                      </span>
                    </div>
                    <h3 className='mt-8 text-lg font-medium text-gray-900 tracking-tight'>
                      You have to setup payouts to post hotel rooms
                    </h3>
                    <p className='mt-3 text-base text-gray-500'>
                      Unity Booking partners with Stripe to transfer earnings to
                      your bank account
                    </p>
                    <CustomButton
                      loading={loading}
                      onClick={handlePayoutsSetup}
                      addStyles='w-max inline-flex'
                    >
                      Setup Payouts
                    </CustomButton>
                    <p className='mt-3 text-xs text-gray-500'>
                      You'll be redirected to Stripe to complete the onboarding
                      process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardResources;
