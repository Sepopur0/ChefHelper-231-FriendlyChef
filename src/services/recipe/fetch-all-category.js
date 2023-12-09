import { useQuery } from 'react-query';
import axios from 'axios';
import {BACKEND_API_PREFIX} from './../../constants/index'
const fetchCategories = async () => {
  const response = await axios.get(`https://chef-helper-backend.onrender.com/api/v1/category`);
  return response.data.result;
}

const useCategories = () => useQuery([`${BACKEND_API_PREFIX}category`], () => fetchCategories());
export default useCategories;