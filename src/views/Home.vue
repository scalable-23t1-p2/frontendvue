<!-- <template>
  <HelloWorld />
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
</script> -->

<template>
  <div class="container mt-5 text-center">
    <h3>{{ message }}</h3>

    <v-col cols="auto">
      <a href="javascript:void(0)" @click="uploadpage">
          <v-btn
            color="primary"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
            @click="uploadpage"
          >
            <v-icon
              icon="mdi-speedometer"
              size="large"
              start
            />
          <span class=“font-weight-bold” style="color: white; font-weight: bold; text-decoration: none;display: inline-block; border-bottom: none;">Upload</span>
        </v-btn>
      </a>
      </v-col>
    <v-btn
      color="warning"
      min-width="228"
      rel="noopener noreferrer"
      size="x-large"
      target="_blank"
      variant="flat"
      @click="myVideosPage"
    >
      <v-icon
        icon="mdi-speedometer"
        size="large"
        start
      />
      <span class=“font-weight-bold” style="color: white; font-weight: bold; text-decoration: none;display: inline-block; border-bottom: none;">My Videos</span>
    </v-btn>
    <br>
    <a href="javascript:void(0)" class="btn btn-lg btn-primary"
       @click="logout"
    >Logout</a>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
import myVideos from "@/views/MyVideos.vue";

export default {
  name: "Home",
  computed: {
    myVideos() {
      return myVideos
    }
  },
  setup() {
    const message = ref('');
    const router = useRouter();
    //on mounted fn = this fn will be call when html has been rendered
    onMounted(async () => {
      try {
        const {data} = await axios.get('/auth/me');
        console.log(data.email)
        // message.value = "Hi";

        message.value = `Hi ${data.email}`;

      } catch (e) {
        await router.push('/login');
      }
    });
    const uploadpage = async () => {
      await router.push('/upload');
    }

    const myVideosPage = async () => {
      await router.push('/myvideos');
    }

    const logout = async () => {
      await axios.post('logout', {}, {withCredentials: true});

      axios.defaults.headers.common['Authorization'] = '';

      await router.push('/login');
    }

    return {
      message,
      myVideosPage,
      uploadpage,
      logout
    }
  }
}
</script>
