import { useQuery } from 'react-query';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import {BACKEND_API_PREFIX} from '../../constants/index'
axiosRetry(axios, { retries: 5 });

const fetchRecipeById = async (id) => {
    try {
    const response = await axios.get(`${BACKEND_API_PREFIX}recipe/${id}`);
    const recipeData = response.data.result.data;

    const recipe = {
        id: recipeData.id,
        name: recipeData.name,
        time: recipeData.time,
        calorie: recipeData.calorie,
        description: recipeData.description,
        images: recipeData.images,
        guide: recipeData.guide,
    };

    return recipe;
    } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    throw error;
    }
};

const useRecipeById = (id) => useQuery([`${BACKEND_API_PREFIX}recipe`, id], () => fetchRecipeById(id), {});

export default useRecipeById;
