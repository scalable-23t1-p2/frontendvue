// imageParserService.js

import axios from 'axios';

const ImageParserService = {
  getImage: async (presignedUrl) => {
    try {
      // Set up Axios instance without global headers
      const axiosInstance = axios.create();
      // Remove the Authorization header specifically for this instance
      axiosInstance.defaults.headers.common['Authorization'] = undefined;

      // Use Axios to fetch the image from the presigned URL
      const response = await axiosInstance.get(presignedUrl, {
        responseType: 'arraybuffer',
      });

      // Convert the array buffer to a Blob
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Read the Blob as a data URL
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      return dataUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  },
};

export default ImageParserService;
