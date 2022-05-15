import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json',
  withCredentials: true
});

export default axios;