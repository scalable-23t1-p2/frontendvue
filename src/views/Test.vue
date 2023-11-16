<template>
  <div>
    <img :src="imageUrl" alt="Image from S3" />
  </div>
</template>

<script>
import ImageParserService from '@/service/ImageParserService';

export default {
  data() {
    return {
      imageUrl: '',
    };
  },
  mounted() {
    // Replace 'YOUR_PRESIGNED_URL' with your actual presigned URL
    const presignedUrl = 'https://toktikbucket.s3.amazonaws.com/example%40test/bahn.jpg?AWSAccessKeyId=AKIAYU354TFUS6B3BHRS&Signature=wbFxUTZmT7TqV2GRJMMvAGgeAyE%3D&Expires=1700081137';

    // Call the getImage method from the service
    ImageParserService.getImage(presignedUrl)
      .then((dataUrl) => {
        // Set the data URL as the source for the image
        this.imageUrl = dataUrl;
      })
      .catch((error) => {
        console.error('Error in component:', error);
      });
  },
};
</script>
