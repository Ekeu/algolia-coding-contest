import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../assets/images/unity-logo.svg';
import CustomButton from '../../../components/custom-button/custom-button.component';
import FormInput from '../../../components/form-input/form-input.component';

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={Logo} alt='Unity Booking' />
        <h2 className='mt-6 text-center text-3xl font-extrabold font-hind text-blue-gray-700'>
          I already have an account ✌🏽
        </h2>
        <p className='mt-2 text-center text-sm text-blue-gray-600 max-w'>
          Or don't have and account yet?
          <Link
            to='/signup'
            className='font-medium text-indigo-500 hover:text-indigo-500'
          >
            {' '}
            Sign up
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <FormInput
                id='email'
                name='email'
                type='email'
                label='Email address'
                autoComplete='email'
                required
                value={email}
                handleChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                label='Password'
                value={password}
                handleChange={handleChange}
              />
            </div>

            <div>
              <CustomButton type='submit'>SIGN IN</CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
