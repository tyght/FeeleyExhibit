// PostArtwork.vue
<template>
  <div>
    <h1>Post Your Artwork</h1>
    <form @submit.prevent="submitArtwork">
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
      <div>
        <label for="file">Upload Image:</label>
        <input type="file" @change="onFileChange" id="file" accept="image/*" />
      </div>
      <button type="submit">Post Artwork</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "PostArtwork",
  data() {
    return {
      artwork: {
        title: "",
        description: "",
        category: "painting",
        tags: "",
        image: null,
      },
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.artwork.image = file;
      }
    },
    async submitArtwork() {
      const formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("description", this.artwork.description);
      formData.append("category", this.artwork.category);
      formData.append("tags", this.artwork.tags);
      if (this.artwork.image) {
        formData.append("image", this.artwork.image);
      }
      try {
        await this.$store.dispatch("postArtwork", formData);
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error posting artwork:", error);
        alert("Failed to post artwork. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
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
