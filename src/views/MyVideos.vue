<script setup>
import { ref, onMounted } from 'vue'
import VideoCard from '@/components/VideoCard.vue'
import axios from "axios";
import {useRouter} from "vue-router";
import reAuthService from "@/service/reAuthService";
const myVideos = ref(null)
const router = useRouter();

onMounted(() => {
  reAuthService.getRefresh()
  axios.get("/s3/my_videos")
      .then((res) => {
        myVideos.value = res.data;
      })
      .catch((error) => {
        console.log(error)
      })
  console.log(myVideos.value)
})
</script>

<template>
  <div class="MyVidList">
    <div class="VideoCard">
      <VideoCard v-for="videoShort in myVideos" :key="videoShort.id" :videoShort="videoShort" /> <!--display-->
    </div>
  </div>
</template>

<style>
.MyVidList {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.VideoCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;

}

</style>
