import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

import Logo from '../../../assets/images/unity-logo.svg';
import FormInput from '../../../components/form-input/form-input.component';
import CustomButton from '../../../components/custom-button/custom-button.component';
import Notification from '../../../components/notification/notification.component';

const SignUp = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ userName, email, password }) => {
    const photoURL = `https://robohash.org/${email}.png?set=set3&size=150x150`;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        '/api/v1',
        {
          userName,
          email,
          password,
          photoURL,
        },
        config
      );
      toast(
        <Notification success headline='Registration succeeded!'>
          Thank you for joining Unity Booking App! Please Sign in
        </Notification>
      );
      history.push('/signin');
    } catch (error) {
      console.log(error);
      if (error.response.status === 400)
        toast(
          <Notification error headline='Registration Failed!'>
            {error.response.data}
          </Notification>
        );
    }
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen bg-blue-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img className='mx-auto h-12 w-auto' src={Logo} alt='HotShopping' />
        <h2 className='mt-6 text-center text-3xl font-extrabold font-hind text-blue-gray-700'>
          I do not have an account 🎉
        </h2>
        <p className='mt-2 text-center text-sm text-blue-gray-600 max-w'>
          Already a member?
          <Link
            to='/signin'
            className='font-medium text-indigo-500 hover:text-indigo-500'
          >
            {' '}
            Sign in
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-md sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={onSubmit}>
            <FormInput
              id='userName'
              name='userName'
              type='text'
              label='userName'
              labelText='User name'
              autoComplete='username'
              register={register('userName', {
                required: 'User name is a required field.',
                maxLength: {
                  value: 15,
                  message: 'User name must not be greater than 15 characters.',
                },
                minLength: {
                  value: 3,
                  message: 'User name must be at least 3 characters.',
                },
              })}
              placeholder='monks___'
              error={errors.userName?.message}
            />

            <FormInput
              id='email'
              name='email'
              type='email'
              label='email'
              labelText='Email address'
              autoComplete='email'
              register={register('email', {
                required: 'Email is a required field.',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Please enter a valid email',
                },
              })}
              placeholder='monks.hot@shopping.com'
              error={errors.email?.message}
            />
            <FormInput
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='new-password'
              labelText='Password'
              label='password'
              placeholder='******'
              register={register('password', {
                required: 'Password is a required field.',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                validate: (value) => {
                  return (
                    [
                      /[a-z]/,
                      /[A-Z]/,
                      /[0-9]/,
                      /[^a-zA-Z0-9]/,
                    ].every((pattern) => pattern.test(value)) ||
                    'Password must include a lower, upper, number and special characters.'
                  );
                },
              })}
              showPassword={showPassword}
              togglePassword={togglePassword}
              error={errors.password?.message}
              passwordEyeIcon
            />
            <div>
              <CustomButton type='submit'>Sign in</CustomButton>
            </div>
          </form>

          <div className='mt-6'></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
