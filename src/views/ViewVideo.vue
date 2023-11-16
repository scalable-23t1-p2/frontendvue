<template>
  <div>

    <button @click="this.$router.go(-1)" class="go-back-button"><v-icon>mdi-close</v-icon></button>

    <!-- Check if the video source is available before rendering the video player -->
    <VideoPlayer v-if="videoSource" :m3u8Content="videoSource" />
    <div v-else>
      <!-- Show a message or placeholder when the video source is not available -->
      Video source not available.
      <page-loader />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import reAuthService from '@/service/reAuthService';
import VideoPlayer from '@/components/VideoPlayer.vue';
import PageLoader from '@/components/PageLoader.vue';
import AppBar from "@/layouts/default/AppBar.vue";
const props = defineProps({
  id: { required: true }
})

const videoSource = ref(null);

onMounted(() => {
  // Make an axios request to fetch the video source
  console.log("props.id = "+props.id)
  axios.post('/s3/process_m3u8', { filename: props.id })
    .then(response => {
      // Assuming response.data.m3u8_content contains the M3U8 content
      videoSource.value = response.data.m3u8_content;
    })
    .catch(error => {
      console.error('Error fetching video source:', error);
    });
});

</script>

<style scoped>
.go-back-button {
  display: inline-block;
  align-items: flex-end;
}
</style>

