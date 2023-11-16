<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template v-slot:image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      ></v-img>
    </template>

    <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>
    <!-- <v-img class="my-10" height="100" width="200" contain src="https://dummyimage.com/600x400/000/fff"></v-img> -->

    <!-- <v-img
      :width="1"
      aspect-ratio="1/1"
      src="src/assets/images/toktik_logo.png"
      ></v-img> -->
    <!-- <v-app-bar-title style="margin-left: 0%;">
      <span class="font-weight-light">TokTik</span>
      <span class="font-weight-bold">Boss</span>
    </v-app-bar-title> -->
    <v-app-bar-title style="margin-left: 0%;">
      <span class="font-weight-light">TokTik</span>
        <router-link to=./>
          <span class=“font-weight-bold” style="color: white; font-weight: bold; text-decoration: none;display: inline-block; border-bottom: none;">Boss</span>
        </router-link>
    </v-app-bar-title>


    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-btn @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {useRouter} from "vue-router";
import axios from "axios";
// import Vue from 'vue'
export default {
  name: "AppBar",
  setup() {
    const router = useRouter();
    const uploadpage = () => {
      router.push({name: '/upload'});
    }
    const myVideosPage = () => {
      router.push({name: '/myVideos'});
    }
    const logout = async () => {
      // const refreshToken = Vue.$cookies.get('refreshToken')
      await axios.delete('/auth/logout', {withCredentials: true});
      // delete axios.defaults.headers.common['Authorization'];
      axios.defaults.headers.common['Authorization'] = '';
      await router.push('/login');
    }

    return {
      router,
      uploadpage,
      myVideosPage,
      logout,
    }
  },

}

</script>
