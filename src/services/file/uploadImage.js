import { useQuery } from 'react-query';
import axios from 'axios';
import {BACKEND_API_PREFIX} from '../../constants/index';

const fetchUploadImage = async (file,type='jpeg') => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: file,
      type: `image/${type}`, // adjust the type based on your image type
      name: 'upload.jpg',
    });

    const response = await axios.post(`${BACKEND_API_PREFIX}file/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.result;
  } catch (error) {
    throw error;
  }
};

const useUploadImage = (file) => useQuery([`${BACKEND_API_PREFIX}file/image`, file], () => fetchUploadImage(file),{});
export  {useUploadImage,fetchUploadImage};