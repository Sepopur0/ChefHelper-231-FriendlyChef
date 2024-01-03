import { useQuery } from 'react-query';
import axios from 'axios';
import { BACKEND_API_PREFIX } from '../../constants/index';

const fetchRecipe = async (data) => {
    try { 
      const response = await axios.post(`${BACKEND_API_PREFIX}recipe`, data,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data.result;
    } catch (error) {
      throw error;
    }
  };
  
  const useFetchRecipe = (data) => useQuery([`${BACKEND_API_PREFIX}recipe`, data], () => fetchRecipe(data),{});
  export {useFetchRecipe,fetchRecipe};