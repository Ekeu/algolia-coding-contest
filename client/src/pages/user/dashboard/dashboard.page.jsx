import React from 'react';

import DashboardNav from '../../../components/navbar/dashboard.navbar.component';
import StripeConnect from '../../../components/stripe-connect/stripe-connect.component';

export default function Dashboard() {
  return (
    <div className='min-h-screen bg-white'>
      <div className='relative max-w-7xl mx-auto py-4 px-1 sm:py-8 sm:px-6 lg:px-2'>
        <StripeConnect />
      </div>
      <div className='sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
        <main>
          <div className='sm:px-0'>
            <div className='sm:block'>
              <DashboardNav />
            </div>
          </div>
          <div className='mt-4'>
            <ul className='space-y-4'>
              <li>
                <h1 className='font-hind'>All your bookings</h1>
              </li>
              <li>
                <h1 className='font-hind'>All your bookings</h1>
              </li>
              <li>
                <h1 className='font-hind'>All your bookings</h1>
              </li>
              <li>
                <h1 className='font-hind'>All your bookings</h1>
              </li>
              <li>
                <h1 className='font-hind'>All your bookings</h1>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
