<template>
  <div class="container mt-5 text-center">
    <h1>Upload Page</h1>
    <h3>{{ message }}</h3>
    <a href="javascript:void(0)" class="btn btn-lg btn-primary"
       @click="logout"
    >Logout</a>
  </div>
  <div id="myProgress" style="display:none;">
          <div id="myBar"></div>
  </div>
  <v-row style="height: 60vh;">
    <v-col>
      <form enctype="multipart/form-data">
        <label for="input-file" id="drop-area" >
          <input type="file" accept="video/*" id="input-file" ref="video" @change="selectFile" hidden>
          <div id="img-view">
            <i class="fa fa-upload" style="color: #6ccbd3; font-size:36px"></i>
            <p class="blue-txt">Click here<br>to upload a video</p>
            <p class="blue-txt" style="font-size: 13px;">no more than 1 minute</p>
          </div>
        </label>
      </form>
      <div id="vid-container">
        <v-btn @click="remove" id="remove" density="compact" icon="mdi-close" style="display: none;color: #fff; background-color: #EE3457"></v-btn>
        <video id="video-preview" controls style="display: none;"></video>
      </div>
    </v-col>
    <v-col>
      <div class="fill-in-container">
        <v-form>
          <p style="font-size: 14px">Caption</p>
          <v-text-field
            variant="outlined"
            v-model="title"
            label="caption"
            counter
            maxlength="100"
            single-line
            :rules="[formRequired]"
            clearable
          ></v-text-field>
          <br />
          <v-row>
            <v-col align="end">
              <v-btn class="reg-btn" @click="navigateToHomePage">
                Cancel
              </v-btn>
              <v-btn
                class="red-btn"
                :disabled="!uploadRequired"
                @click="uploadVideo"
              >
                Upload
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <!-- <br> -->
        <!-- <div id="myProgress" >
          <div id="myBar" style="width: {{ this.uploadProgress }}%;">
            {{ this.uploadProgress }}%
          </div>
        </div> -->
      </div>
    </v-col>
  </v-row>
</template>


<script>
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "Upload",
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

    const logout = async () => {
      await axios.post('logout', {}, {withCredentials: true});

      axios.defaults.headers.common['Authorization'] = '';

      await router.push('/login');
    }

    return {
      message,
      logout
    }
  },
  data(){
    return{
      video: '',
      title: null,
      formRequired: value => !!value || 'Field is required',
      uploadProgress: 0,
      presigned_url: ''
    }
  },
  computed: {
    uploadRequired() {
      return this.video !== null && this.title !== null;
    },
  },
  methods: {
    uploadVideoToS3() {
      const filename = this.video.name;
      const fileExtension = filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
      console.log("this is the filename: "+filename)
      console.log("this is the file extension: "+fileExtension)
      const formData = new FormData();
      formData.append("filename", filename);
      axios.post('/s3/upload_link/', formData, {headers: { "Content-Type": "multipart/form-data" },})
        .then((res) => {
          let data = res.data;
          this.presigned_url = data.presigned_url
          // this.extURL = data.message;
          console.log(this.presigned_url)
          // // Once this.extURL is set, call putVideo
          this.putFileToS3(filename);
        })
    },
    async putFileToS3(filename) {
      const file = this.video;
      const PUTEndpoint = this.presigned_url
      console.log("put end pt: "+PUTEndpoint)
      const options = {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
        this.uploadProgress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
      },
      };
      try {
        delete axios.defaults.headers.common['Authorization'];
        const response = await axios.put(PUTEndpoint, file,options);
        // const response = await axios.put(PUTEndpoint, file);
        console.log(response);
        this.uploadProgress = 100;
        const {status, data} = await axios.put('/auth/refresh', {}, {
          withCredentials: true
        });
        if (status === 200) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
          console.log("success reset access token")
        }
        this.startWorkers(filename);
      } catch (error) {
        console.log(error);
      }
    },
    startWorkers(filename){
      const form = new FormData();
      form.append('filename', filename)
      form.append('caption', this.title)
      try {
        axios.post("/s3/process_vid", form)
          .then((res) => {
            console.log("raw result"+res)
            let data = res.data
            console.log("process_video result = "+data)
            let process_video_result = data['return_value']
            console.log("process_video result = "+process_video_result)
            if (process_video_result=="success") {alert("process_video result = "+process_video_result)} else {
              alert("fail to upload the video")
            }
          }).catch(
          err => { console.log(err)})
      } catch (error) {
        console.log(error);
      }
    },
    remove(){
      const videoElement = document.getElementById('video-preview');
      videoElement.pause();
      videoElement.style.display = 'none';
      document.getElementById('remove').style.display='none';
      document.getElementById('vid-container').style.display='none';
      document.getElementById('drop-area').style.display='block';
      document.getElementById('video-preview').style.display = 'block';
      document.getElementById('input-file').value = '';
      this.thumbnail = null;
      this.video = null;
    },
    selectFile(){
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const videoElement = document.createElement('video');
        videoElement.preload = 'metadata';

        videoElement.onloadedmetadata = () => {
          const duration = videoElement.duration;
          if (duration < 1) {
            this.remove();
            document.getElementById('input-file').value = '';
            alert('Please select a video that is at least 1 second long.');
          } else if (duration > 60) {
            this.remove();
            document.getElementById('input-file').value = '';
            alert('Please select a video that is no more than 1 minute long.');
          }
        };
        videoElement.src = URL.createObjectURL(selectedFile);
      }
      this.video = this.$refs.video.files[0];
      if (this.video){
        const videoElement = document.getElementById('video-preview');
        videoElement.style.display = 'block';
        const videoURL = URL.createObjectURL(selectedFile);
        videoElement.src = videoURL;
        document.getElementById('vid-container').style.display='block';
        document.getElementById('drop-area').style.display='none';
        document.getElementById('remove').style.display='block';
      }
    },
    navigateToHomePage(){ this.$router.push('/'); },
    navigateToMyVideos(){
      this.$router.push({ path: 'myVideos'});
    },
    async uploadVideo(){
      if (!this.video) {
        alert('Please select a video to upload.');
        return;
      }
      try {
        this.uploadVideoToS3();
        // this.navigateToHomePage()
        this.navigateToMyVideos();
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    },
  },
}
</script>


<style scoped>
@import '@/styles/btn-style.css';
.fill-in-container{
  padding: 20px;
  margin: 2pc 2pc 2pc 0pc;
  height: 38pc;
}
#drop-area{
  border: 2px dashed #CECECE;
  margin: 2pc;
  padding: 20px;
  height: 38pc;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.blue-txt{
  color: #6DCBD3;
  font-size: 20px;
  font-weight: 500;
  padding: 0px 0px 10px 0px;
}
#img-view{
  width: 100%;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  text-align: center;
}

#vid-container{
  display: none;
  margin: 2pc;
  height: 38pc;
  place-items: center;
  overflow: hidden;
  background: black;
  position: relative; /* Add relative positioning */
}
#vid-container video{
  max-width: 100%; /* Ensure the video doesn't exceed the container's width */
  max-height: 100%; /* Ensure the video doesn't exceed the container's height */
  width: auto; /* Allow the video to scale based on its aspect ratio */
  height: auto;
  position: absolute; /* Position the video absolutely */
  top: 50%; /* Center vertically */
  left: 50%; /* Center horizontally */
  transform: translate(-50%, -50%);
}
#remove {
  cursor: pointer;
  top: 5px;
  left: 5px;
  background: #EE3457;
  margin: 0;
  padding: 0;
  z-index: 1;
}
.thumbnail-frame{
  height: 10pc;
  width: 10pc;
  place-items: center;
  overflow: hidden;
  background: black;
  position: relative;
  border-radius: 3px;
}
.thumbnail-frame img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
#myProgress {
  display: block;
  width: 100%;
  /* background-color: #ededed; */
}

#myBar {
  height: 30px;
  background-color: #7bd5ba;
  text-align: center;
  line-height: 30px;
  color: white;
}
</style>
