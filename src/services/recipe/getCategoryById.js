import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'
axiosRetry(axios, { retries: 5 });
const fetchCategory = async (id) => {

  try {
    const response = await axios.get(`${BACKEND_API_PREFIX}category/${id}`);
    return response.data.result;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
}

const useCategory = (id) => useQuery([`${BACKEND_API_PREFIX}category`, id], () => fetchCategory(id));
export default useCategory;
