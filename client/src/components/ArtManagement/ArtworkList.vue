<template>
  <div>
    <h1>All Artworks</h1>
    <div v-for="artwork in artworks" :key="artwork.id">
      <img :src="BASE_URL + artwork.image" alt="Artwork Image" />
      <p>{{ artwork.title }}</p>
      <p>{{ artwork.description }}</p>
      <p>
        <button @click="navigateToArtworkDetail(artwork.id)">
          View Details
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import ArtworksService from "@/services/ArtworksService";
export default {
  data() {
    return {
      artworks: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
    await this.loadArtworks();
  },
  methods: {
    async loadArtworks() {
      try {
        const response = await ArtworksService.getAllArtworks();
        this.artworks = response.data;
      } catch (err) {
        console.error("Error fetching artworks:", err);
      }
    },
    navigateToArtworkDetail(id) {
      this.$router.push(`/artwork/${id}`);
    },
  },
};
</script>

<style scoped>
img {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}
</style>
``` #### 2. `client/src/components/ArtManagement/ArtworkDetail.vue` ```vue
<template>
  <div>
    <h1>{{ artwork.title }}</h1>
    <img :src="BASE_URL + artwork.image" alt="Artwork Image" />
    <p>{{ artwork.description }}</p>
    <p>By: {{ artwork.artist }}</p>
    <p>Category: {{ artwork.category }}</p>
    <p>Tags: {{ artwork.tags }}</p>
    <button @click="likeArtwork">Like</button>
    <div>
      <comments-section :artwork-id="artwork.id" />
    </div>
  </div>
</template>

<script>
import ArtworksService from "@/services/ArtworksService";
import CommentsSection from "@/components/Interaction/CommentsSection.vue";
export default {
  components: {
    CommentsSection,
  },
  data() {
    return {
      artwork: {},
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
    await this.loadArtworkDetail();
  },
  methods: {
    async loadArtworkDetail() {
      const artworkId = this.$route.params.id;
      try {
        const response = await ArtworksService.getArtworkById(artworkId);
        this.artwork = response.data;
      } catch (err) {
        console.error("Error fetching artwork details:", err);
      }
    },
    likeArtwork() {
      console.log("Liked artwork:", this.artwork.id);
    },
  },
};
</script>

<style scoped>
img {
  max-width: 600px;
  height: auto;
}
</style>
``` #### 3. `client/src/components/Art Management/PostArtwork.vue` ```vue
<template>
  <div>
    <h1>Post Your Artwork</h1>
    <form @submit.prevent="postArtwork">
      <label>Title:</label>
      <input type="text" v-model="artwork.title" />
      <label>Description:</label>
      <textarea v-model="artwork.description"></textarea>
      <label>Category:</label>
      <input type="text" v-model="artwork.category" />
      <label>Tags:</label>
      <input type="text" v-model="artwork.tags" />
      <div class="dropbox">
        <input type="file" @change="onFileSelected" accept="image/*" />
      </div>
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script>
import ArtworksService from "@/services/ArtworksService";
export default {
  data() {
    return {
      artwork: {
        title: "",
        description: "",
        category: "",
        tags: "",
        image: null,
      },
      selectedFile: null,
    };
  },
  methods: {
    async postArtwork() {
      const formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("description", this.artwork.description);
      formData.append("category", this.artwork.category);
      formData.append("tags", this.artwork.tags);
      formData.append("image", this.selectedFile);
      try {
        await ArtworksService.postArtwork(formData);
        this.$router.push("/artworks");
      } catch (err) {
        console.error("Error posting artwork:", err);
      }
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
