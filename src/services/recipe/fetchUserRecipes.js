import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { BACKEND_API_PREFIX } from '../../constants/index';

axiosRetry(axios, { retries: 5 });

const fetchRecipeUploadedByUser = async (id) => {
  try {
    const response = await axios.get(`${BACKEND_API_PREFIX}recipe/uploaded-by/${id}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return response.data.result;
  } catch (error) {
    console.error(`Error fetching recipe uploaded by ID ${id}:`, error);
    throw error;
  }
};

const useRecipeUploadedByUser = (id) => {
  return useQuery([`${BACKEND_API_PREFIX}recipe/uploaded-by`, id], () => fetchRecipeUploadedByUser(id), {});
};

export default useRecipeUploadedByUser;