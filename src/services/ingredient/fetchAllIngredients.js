import { useQuery } from 'react-query';
import axios from 'axios';
import {BACKEND_API_PREFIX} from '../../constants/index'
const fetchIngredients = async () => {
  const response = await axios.get(`${BACKEND_API_PREFIX}ingredient`);
  return response.data.result;
}

const useIngredients = () => useQuery([`${BACKEND_API_PREFIX}ingredient`], () => fetchIngredients());
export default useIngredients;