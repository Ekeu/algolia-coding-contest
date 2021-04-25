import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Logo from '../../../assets/images/unity-logo.svg';

import { signin } from '../../../redux/user/user.actions';

import CustomButton from '../../../components/custom-button/custom-button.component';
import FormInput from '../../../components/form-input/form-input.component';
import Notification from '../../../components/notification/notification.component';

const SignIn = ({ history }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await signin({
        email,
        password,
      });

      if (res.data) {
        window.localStorage.setItem('currentUser', JSON.stringify(res.data));
        dispatch({
          type: 'USER_SIGN_IN',
          payload: res.data,
        });
      }
      setLoading(false);
      toast(
        <Notification success headline='Login succeeded!'>
          Welcome {res.data.userName}! Happy to see you back!
        </Notification>
      );
      history.push('/dashboard');
    } catch (error) {
      if (error.response.status === 400) {
        setLoading(false);
        toast(
          <Notification error headline='Login Failed!'>
            {error.response.data}
          </Notification>
        );
      }
    }
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='min-h-screen bg-blue-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
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
          <form className='space-y-6' onSubmit={onSubmit}>
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
              autoComplete='current-password'
              labelText='Password'
              label='password'
              placeholder='******'
              register={register('password', {
                required: 'Password is a required field.',
              })}
              showPassword={showPassword}
              togglePassword={togglePassword}
              error={errors.password?.message}
              passwordEyeIcon
            />

            <div>
              <CustomButton type='submit' loading={loading}>
                Sign in
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
