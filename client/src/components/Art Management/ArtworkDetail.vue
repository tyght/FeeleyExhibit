// ArtworkDetail.vue
<template>
  <div>
    <h1>{{ artwork.title }}</h1>
    <img :src="artwork.imageUrl" alt="Artwork Image" class="artwork-image" />
    <p>{{ artwork.description }}</p>
    <p><strong>Category:</strong> {{ artwork.category }}</p>
    <p><strong>Tags:</strong> {{ artwork.tags }}</p>
    <div class="interaction-section">
      <button @click="likeArtwork">Like</button>
      <span>{{ likes }} Likes</span>
    </div>
    <CommentsSection :artworkId="artwork.id" />
  </div>
</template>

<script>
import CommentsSection from "@/components/Interaction/CommentsSection.vue";

export default {
  name: "ArtworkDetail",
  components: { CommentsSection },
  data() {
    return {
      artwork: {
        id: null,
        title: "",
        description: "",
        category: "",
        tags: "",
        imageUrl: "",
      },
      likes: 0,
    };
  },
  async created() {
    try {
      const artworkId = this.$route.params.artworkId;
      const response = await this.$store.dispatch("fetchArtwork", artworkId);
      this.artwork = response.data;
      this.likes = response.data.likes;
    } catch (error) {
      console.error("Error fetching artwork details:", error);
      alert("Failed to load artwork details. Please try again.");
    }
  },
  methods: {
    async likeArtwork() {
      try {
        await this.$store.dispatch("likeArtwork", this.artwork.id);
        this.likes += 1;
      } catch (error) {
        console.error("Error liking artwork:", error);
        alert("Failed to like artwork. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.artwork-image {
  width: 300px;
  height: auto;
  margin-bottom: 20px;
}
.interaction-section {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
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
