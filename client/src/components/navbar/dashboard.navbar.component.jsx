import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const tabs = [
  { name: 'Your Bookings', to: '/dashboard' },
  { name: 'Your Hotels', to: '/dashboard/my/resources' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DashboardNav = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav
      className='relative z-0 rounded-lg shadow flex divide-x divide-gray-200'
      aria-label='Tabs'
    >
      {tabs.map((tab, tabIdx) => (
        <Link
          key={tab.name}
          to={tab.to}
          aria-current={pathname === tab.to ? 'page' : undefined}
          className={classNames(
            pathname === tab.to
              ? 'text-gray-900'
              : 'text-gray-500 hover:text-gray-700',
            tabIdx === 0 ? 'rounded-l-lg' : '',
            tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
            'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10'
          )}
        >
          <span>{tab.name}</span>
          <span
            aria-hidden='true'
            className={classNames(
              pathname === tab.to ? 'bg-indigo-500' : 'bg-transparent',
              'absolute inset-x-0 bottom-0 h-0.5'
            )}
          />
        </Link>
      ))}
    </nav>
  );
};

export default DashboardNav;
