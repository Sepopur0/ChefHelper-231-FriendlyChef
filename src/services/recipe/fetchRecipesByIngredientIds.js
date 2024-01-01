import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { BACKEND_API_PREFIX } from '../../constants/index';

axiosRetry(axios, { retries: 5 });

const fetchRecipesByIngredientIds = async (ingredientIds) => {
  try {
    if (ingredientIds.length === 0) {
      // If the ingredientIds array is empty, return an empty array directly
      return {data:[]};
    }
    const response = await axios.get(`${BACKEND_API_PREFIX}recipe/by-ingredient`, {
      params: { ids: ingredientIds },
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching recipes by ingredient IDs:', error);
    throw error;
  }
};

const useRecipesByIngredientIds = (ingredientIds) => {
  return useQuery([`${BACKEND_API_PREFIX}recipe/by-ingredient`, ingredientIds], () => fetchRecipesByIngredientIds(ingredientIds), {});
};

export default useRecipesByIngredientIds;
