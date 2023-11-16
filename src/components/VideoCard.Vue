<script setup>
  defineProps({
    videoShort: {
      type: Object,
      required: true,
    }
  })

</script>

<template>
  <RouterLink style="text-decoration: none; color: inherit;" :to="{ name: 'viewVideo', params: {id: videoShort.name} }" >
    <div class="product-card">
      <img :src="videoShort.presigned_jpg_url" alt="Video Thumbnail Image"/>
      <h2>{{ videoShort.name }}</h2>
      <h6>Uploaded by {{videoShort.owner}}</h6>
    </div>
  </RouterLink>
</template>

<style scoped>
img {
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
}
span {
  font-size: x-small;
  text-align: center;
}
h2 {
  font-size: medium;
  text-align: center;
}
h6 {
  font-size: small;
  text-align: center;
}
.product-card {
  background-color: lightseagreen;
  padding: 20px;
  width: auto;
  cursor: pointer;
  border-radius: 15px;
  margin-bottom: 18px;
  margin-inline: 80px;
}
.product-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>