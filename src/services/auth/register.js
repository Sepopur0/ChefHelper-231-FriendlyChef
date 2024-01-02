import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'

const fetchRegister = async (userName, password, email) => {
  try { 
    const response = await axios.post(`${BACKEND_API_PREFIX}auth/register`, {
      userName: userName,
      password: password,
      email: email
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const useRegister = (userName, password, email) => useQuery([`${BACKEND_API_PREFIX}auth/register`, userName, password, email], () => fetchRegister(userName, password, email),{});
export default useRegister;