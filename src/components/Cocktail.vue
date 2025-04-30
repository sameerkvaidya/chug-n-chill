<template>
  <div class="card">
    <img :src="thumbnailUrl" alt="Thumbnail" class="thumbnail" />
    <p>{{ name }}</p>
  </div>
</template>



<script>


export default {
    name: "Cocktail",
    props:{
        name: {type: String},
        thumbnailUrl: {type: String}
    }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 10px;
}

.thumbnail {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
</style>