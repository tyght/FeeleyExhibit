// EditArtwork.vue
<template>
  <div>
    <h1>Edit Artwork</h1>
    <form @submit.prevent="updateArtwork">
      <div>
        <label for="title">Title:</label>
        <input type="text" v-model="artwork.title" id="title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          v-model="artwork.description"
          id="description"
          required
        ></textarea>
      </div>
      <div>
        <label for="category">Category:</label>
        <select v-model="artwork.category" id="category">
          <option value="painting">Painting</option>
          <option value="sculpture">Sculpture</option>
          <option value="digital">Digital Art</option>
          <option value="photography">Photography</option>
        </select>
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input
          type="text"
          v-model="artwork.tags"
          id="tags"
          placeholder="Comma separated tags"
        />
      </div>
      <div v-if="artwork.imageUrl">
        <img
          :src="artwork.imageUrl"
          alt="Artwork Image"
          class="artwork-image"
        />
      </div>
      <div>
        <label for="file">Update Image:</label>
        <input type="file" @change="onFileChange" id="file" accept="image/*" />
      </div>
      <button type="submit">Update Artwork</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditArtwork",
  data() {
    return {
      artwork: {
        id: null,
        title: "",
        description: "",
        category: "painting",
        tags: "",
        image: null,
        imageUrl: "",
      },
    };
  },
  async created() {
    try {
      const artworkId = this.$route.params.artworkId;
      const response = await this.$store.dispatch("fetchArtwork", artworkId);
      this.artwork = response.data;
      this.artwork.imageUrl = response.data.image;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      alert("Failed to load artwork details. Please try again.");
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.artwork.image = file;
      }
    },
    async updateArtwork() {
      const formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("description", this.artwork.description);
      formData.append("category", this.artwork.category);
      formData.append("tags", this.artwork.tags);
      if (this.artwork.image) {
        formData.append("image", this.artwork.image);
      }
      try {
        await this.$store.dispatch("updateArtwork", {
          artworkId: this.artwork.id,
          formData,
        });
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error updating artwork:", error);
        alert("Failed to update artwork. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.artwork-image {
  width: 150px;
  height: auto;
  margin-top: 10px;
  margin-bottom: 20px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: auto;
}
label {
  font-weight: bold;
}
input,
textarea,
select {
  padding: 8px;
  font-size: 1em;
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
