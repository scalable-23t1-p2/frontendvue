<template>
  <div>
    <!-- Check if the video source is available before rendering the video player -->
    <VideoPlayer v-if="videoSource" :m3u8Content="videoSource" />
    <div v-else>
      <!-- Show a message or placeholder when the video source is not available -->
      Video source not available.
      <page-loader />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from "axios";
import reAuthService from "@/service/reAuthService";
import VideoPlayer from "@/components/VideoPlayer.vue";
import PageLoader from "@/components/PageLoader.vue"; // Import `ref` and `onMounted`

export default {
  components: {
    PageLoader,
    VideoPlayer,
  },
  data() {
    return {
      videoSource: null,
    };
  },
  beforeMount() {
    reAuthService.getRefresh()
  },
  mounted() {
    // Make an axios request to fetch the video source
    axios.post('/s3/process_m3u8', { filename: 'daran' }) // Replace with your actual API endpoint
      .then(response => {
        // Assuming response.data.m3u8_content contains the M3U8 content
        this.videoSource = response.data.m3u8_content;
      })
      .catch(error => {
        console.error('Error fetching video source:', error);
      });
  },
};
</script>
