import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'
axiosRetry(axios, { retries: 5 });
const fetchRecipes = async (isCommon, categoryId, searchPhrase) => {
  let params = {};
  if (typeof isCommon === 'boolean') {
    params.isCommon = isCommon;
  }
  if (typeof categoryId === 'number') {
    params.categoryId = categoryId;
  }
  if (typeof searchPhrase === 'string' && searchPhrase != '') {
    params.search = searchPhrase;
  }
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

const useRecipes = (isCommon, categoryId, searchPhrase) => useQuery([`${BACKEND_API_PREFIX}recipe`, isCommon, categoryId, searchPhrase], () => fetchRecipes(isCommon, categoryId, searchPhrase),{});
export default useRecipes;