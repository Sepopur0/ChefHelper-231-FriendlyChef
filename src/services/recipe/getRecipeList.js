import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'
axiosRetry(axios, { retries: 5 });
const fetchRecipes = async (isCommon, categoryId) => {
  let params = {};
  if (typeof isCommon === 'boolean') {
    params.isCommon = isCommon;
  }
  if (typeof categoryId === 'number') {
    params.categoryId = categoryId;
  }
  console.log('Params: ',params);
  try { 
    const response = await axios.get(`${BACKEND_API_PREFIX}recipe`, {
      params: params,
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

const useRecipes = (isCommon, categoryId) => useQuery([`${BACKEND_API_PREFIX}recipe`, isCommon, categoryId], () => fetchRecipes(isCommon, categoryId),{
  enabled: !!isCommon,
  enabled: !!categoryId,
});
export default useRecipes;