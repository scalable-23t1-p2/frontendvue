<template>
  <div>
    <div>
      <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
    </div>
    <video
      :width=800
      :height=800
      ref="player"
      class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';3
import AppBar from "@/layouts/default/AppBar.vue";

export default {
  components: {AppBar},
  props: {
    m3u8Content: String,
  },
  data() {
    return {
      isPlaying: false,
    };
  },
  mounted() {
    // Initialize video.js
    const options = {
      controls: true,
    };
    this.player = videojs(this.$refs.player, options, () => {
      this.player.on('play', this.handlePlay);
      this.player.on('pause', this.handlePause);
    });

    // Set the M3U8 content after player initialization
    this.setM3U8Content(this.m3u8Content);
  },
  beforeDestroy() {
    // Dispose of video.js player
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    togglePlay() {
      if (this.isPlaying) {
        this.player.pause();
      } else {
        this.player.play();
      }
    },
    handlePlay() {
      this.isPlaying = true;
    },
    handlePause() {
      this.isPlaying = false;
    },
    setM3U8Content(content) {
      console.log("this content inplayer"+content)
      // Set the M3U8 content in the video.js player
      // this.player.src({ src: content, type: 'application/x-mpegURL' });
      // this.player.src({
      //   src: content,
      //   type: 'application/x-mpegURL'
      // });
      const blob = new Blob([content], { type: 'application/x-mpegURL' });

      // Create a URL for the Blob
      const blobUrl = URL.createObjectURL(blob);

      // Set the Blob URL as the source for the video.js player
      this.player.src({
        src: blobUrl,
        type: 'application/x-mpegURL'
      });
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
