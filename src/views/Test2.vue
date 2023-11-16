<template>
  <div>
    <!-- Check if the video source is available before rendering the video player -->
<!--    <VideoPlayer v-if="videoSource" :m3u8Content="videoSource" />-->
    <video-player v-if="videoSource"  ref="player" :options="videoOptions" ></video-player>

    <div v-else>
      <!-- Show a message or placeholder when the video source is not available -->
      Video source not available.
      <page-loader />
    </div>
  </div>
<!--  <div>-->
<!--    <video-player ref ="player" :options="videoOptions"></video-player>-->
<!--  </div>-->
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer2.vue'; // Adjust the path based on your project structure
// import VideoPlayer2 from '@/components/VideoPlayer2.vue'; // Adjust the path based on your project structure
import axios from "axios";
import reAuthService from "@/service/reAuthService";
export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      presignedM3U8Content: "#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-TARGETDURATION:8\n#EXTINF:8.333333,\nhttps://toktikbucket.s3.amazonaws.com/example%40test/daran0.ts?AWSAccessKeyId=AKIAYU354TFUS6B3BHRS&Signature=psRfc5ZK0DZVT4buXXgtZ7yFC2Q%3D&Expires=1700140361\n#EXTINF:0.733333,\nhttps://toktikbucket.s3.amazonaws.com/example%40test/daran1.ts?AWSAccessKeyId=AKIAYU354TFUS6B3BHRS&Signature=bLd91kq5Dr4auhFwoj05ha%2BEQUs%3D&Expires=1700140361\n#EXT-X-ENDLIST\n",
      videoSource: null,
      videoOptions: {autoplay: true,
        controls: true,
        loop: true,
        sources: [
          {
            src: this.videoSource,
            type: 'application/x-mpegURL'
          }
        ]
      },

    }
  },

  mounted() {
    // reAuthService.getRefresh()
    const {status, data} = axios.put('/auth/refresh', {}, {
      withCredentials: true
    });
    if (status === 200) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      console.log("success reset access token")
    }
    this.get_m3u8_content();
    console.log("this.presignedM3U8Content ="+this.presignedM3U8Content)
    this.test1();
  },
  computed: {
    player () {
      return this.$refs.player.player
    }

  },
  methods: {
    async get_m3u8_content() {
      await axios.post('s3/process_m3u8', { filename: 'daran' })
        .then(response => {
          console.log("in get m3u8"+response.data.m3u8_content)
          this.presignedM3U8Content = response.data.m3u8_content;
          console.log("this.presignedM3U8Content ="+this.presignedM3U8Content)
          // return response.data.m3u8_content;
        })
        .catch(error => {
          console.error('Error fetching presigned M3U8 content:', error);
        });
    },
    test1() {
      const blob = new Blob([this.presignedM3U8Content]);
      const blobUrl = URL.createObjectURL(blob);
      this.videoSource = blobUrl;

    }
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
