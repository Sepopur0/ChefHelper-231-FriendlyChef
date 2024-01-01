import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'

const fetchLogin = async (userName, password) => {
  try { 
    const response = await axios.post(`${BACKEND_API_PREFIX}auth/login`, {
      userName: userName,
      password: password
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const useLogin = (userName, password) => useQuery([`${BACKEND_API_PREFIX}auth/login`, userName, password], () => fetchLogin(userName, password),{});
export default useLogin;