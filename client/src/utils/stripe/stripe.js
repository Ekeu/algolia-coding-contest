import axios from 'axios';

export const stripeConnectAccount = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post('/api/v1/stripe/connect', {}, config);
};

export const getUserStripeAccountStatus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post('/api/v1/stripe/status', {}, config);
};

export const getUserStripeAccountBalance = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post('/api/v1/stripe/balance', {}, config);
};

export const payOutSettings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post('/api/v1/stripe/settings', {}, config);
}