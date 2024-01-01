import { useQuery } from 'react-query';
import axios from 'axios';
import { BACKEND_API_PREFIX } from '../../constants/index';

const fetchProfile = async (accessToken) => {
  try {
    if(!accessToken){
      return {};
    }
    const response = await axios.get(`${BACKEND_API_PREFIX}auth/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: '*/*',
      },
    });
    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const useProfile = (accessToken) =>
  useQuery([`${BACKEND_API_PREFIX}auth/profile`, accessToken], () => fetchProfile(accessToken), {});

export default useProfile;
