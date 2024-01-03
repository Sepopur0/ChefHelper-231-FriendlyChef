import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { BACKEND_API_PREFIX } from '../../constants/index';

axiosRetry(axios, { retries: 5 });

const fetchRecipeBookmarkedByUser = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_API_PREFIX}user/${id}/bookmark-recipe`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching recipe bookmarked by ID ${id}:`, error);
    throw error;
  }
};

const useRecipeBookmarkedByUser = (id) => {
  return useQuery([`${BACKEND_API_PREFIX}user/${id}/bookmark-recipe`, id], () => fetchRecipeBookmarkedByUser(id), {});
};

export { useRecipeBookmarkedByUser,fetchRecipeBookmarkedByUser};