// ArtworkList.vue
<template>
  <div>
    <h1>Artwork List</h1>
    <div class="artwork-container">
      <div v-for="artwork in artworks" :key="artwork.id" class="artwork-card">
        <img :src="artwork.imageUrl" alt="Artwork Image" class="artwork-thumbnail" />
        <h3>{{ artwork.title }}</h3>
        <p>{{ artwork.description }}</p>
        <button @click="viewArtwork(artwork.id)">View Details</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtworkList",
  data() {
    return {
      artworks: [],
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch("fetchArtworks");
      this.artworks = response.data;
    } catch (error) {
      console.error("Error fetching artworks:", error);
      alert("Failed to load artworks. Please try again.");
    }
  },
  methods: {
    viewArtwork(artworkId) {
      this.$router.push({ name: "artwork-detail", params: { artworkId } });
    },
  },
};
</script>

<style scoped>
.artwork-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
.artwork-card {
  width: 200px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.artwork-thumbnail {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
}
button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>

