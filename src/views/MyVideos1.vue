<template>
    <div v-if="this.is_loaded === false">
        <PageLoader />
    </div>
    <div style="margin: 2pc">
      <div id="upload-progress-container" style="display:none">
        <progress id="upload-progress" value="0" max="100"></progress>
      </div>
      <v-row class="container">
        <div class="circle">

<!--          <p class="initial">{{ this.username[0] || 'U' }}</p>-->
        </div>
<!--        <p class="name">@{{ this.username || 'Unknown User' }}</p>-->
        <hr class="line-below-name">
      </v-row>
      <v-row>
        <v-col v-for="(video,id) in list" :key="id" cols="12" sm="6" md="3">
          <v-btn v-if="video.is_process === 1" @click="deleteVideo(video.video)" id="remove" density="compact" icon="mdi-close" style="color: #fff; background-color:transparent" ></v-btn>
          <v-card class="card-container" @click="redirect(video.video)">
            <div class="vid" >
                <img :src="video.preview" style="width: 100%;height: 100%;" class="preview" v-if="video.is_process===1">
                <p v-else class="centered-container">
                  <span class="loader"></span>
                  <br >
                  Prcessing...
                </p>
              <v-row style="position: relative; left: 1.5pc; bottom: 1.5pc;z-index: 2;" v-if="video.is_process===1">
                <i class="fa fa-play" style="color: white; margin-right: 10px;"></i>
                <p class="txt-card" style="font-size: 15px; position: absolute; left: 18px; bottom: -3px">
                   {{ video.views }} {{ video.views <= 1 ? 'view' : 'views' }}
                </p>
              </v-row>
            </div>
            <div class="description" style="z-index: 2;">
              <div class="line">{{ video.caption }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </div>
  </template>

  <script >
  import axios from 'axios';
  import PageLoader from '@/components/PageLoader.vue';
  export default {
    name: "My videos",
    components: {PageLoader},
    data(){
      return{
        username: localStorage.getItem('username'),
        list: [],
        page:-1,
        size:12,
        is_loaded: false,
      }
    },
    methods:{
      redirect(Filename){
        this.$router.push({ name: 'play', params: {"video": Filename}})
      },
      deleteVideo(filename){
        axios.get("/api/video/delete/"+filename)
          .then((res) => {
            alert(res.data.message)
          })
      },
      reset(){
        let temp = [];
        this.size =  this.list.length+1;
        axios.get("/api/u/profile",{
          params: {page: 0, size: this.size},
        })
            .then((res) => {
              if (res.data.length >= 1) {
                res.data.forEach(item => {
                    if(item.is_process==-1){
                      alert("fail to upload the video")
                    } else {
                      temp.push(item)
                    }
                });
              }
              this.list = temp;
            })
      },
      fetchData(){
        this.page += 1;
        axios.get("/s3/my_videos")
            .then((res) => {
              if (res.data.length >= 1) {
                res.data.forEach(item => {
                  this.list.push(item)
                });

              } else {
                this.page -=1;
              }
              console.log(this.list)
              this.is_loaded = true;
            })
        },
    },
    // The mounted lifecycle hook is used to add an event listener to the window object.
    // When the user scrolls the page, the scrollTop, scrollHeight, and clientHeight properties of the documentElement object are used to determine
    // if the user has scrolled to the bottom of the page. If the user has scrolled to the bottom of the page, the fetchData method is called to load
    // more data.The mounted hook is being used to set up the infinite scrolling behavior of the component.
    // scrollTop is the distance between the top of the container and the top of the visible content.
    // clientHeight is the height of the visible content. scrollHeight is the total height of the content, including the part that is not visible.
    // The condition scrollTop+clientHeight>=scrollHeight-10 checks if the user has scrolled to the bottom of the container by verifying
    // if the sum of the distance between the top of the container and the top of the visible content (scrollTop) and
    // the height of the visible content (clientHeight) is greater than or equal to the total height of the content (scrollHeight) minus 10 pixels.
    // The subtraction of 10 pixels is to account for any potential rounding errors or discrepancies between different browsers.
    // This code is a condition that checks if the user has scrolled to the bottom of a scrollable container.
    mounted() {
      window.addEventListener("scroll",() => {
          let scrollTop=document.documentElement.scrollTop;
          let scrollHeight=document.documentElement.scrollHeight;
          let clientHeight=document.documentElement.clientHeight;
          if(scrollTop+clientHeight>=scrollHeight-10) {
            this.fetchData();
          }
        })
    },
    // beforeMount() {
    //   //this.reset();
    // }
  }
  </script>

  <style scoped>
  @import '@/styles/btn-style.css';

  .circle {
    width: 80px;
    height: 80px;
    background-color: #000000;
    border-radius: 50%;
    /* border: 2px solid black; */
  }
  .initial{
    color: white;
    font-weight: bolder;
    font-size: 3pc;
    text-align: center;
  }
  .name{
    color: black;
    font-weight: bold;
    font-size: 1pc;
  }
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line-below-name{
    width: 90%;
    margin: 10px 0;
    border: 1px solid #dcdcdc;
  }
  .card-container{
     width: 100%;
     overflow: hidden;
   }
   .vid{
    height: 25pc;
    width: 100%;
    overflow: hidden;
    background-color: #000000;
  }
  .description{
    background-color: #ffffff;
    padding: 1pc 1pc 0pc 1pc ;
  }
  .txt-card{
    color: white;
  }
  .line {
    color: black;
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: scroll;
    direction: ltr;
    line-height: 1.5;
    pointer-events: auto;
  }
  .line::-webkit-scrollbar {
    width: 0; /* Hide scrollbar in Webkit browsers */
  }
  .vid::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 25%;
    bottom: 3.3pc;
    left: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0)); /* Fade from black to transparent */
    z-index: 1;
    pointer-events: none;
  }
  #remove{
    position: relative;
    top: 2.1pc;
    right: -.3pc;
    z-index: 1;
  }
  .preview{
    height: 25pc;
    width: 100%;
    object-fit: cover;
  }
  .centered-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    height: 100%;
  }
  .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #ffffff;
      /* border: 5px solid #6DCBD3; */
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      }

      @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
      }

  </style>
