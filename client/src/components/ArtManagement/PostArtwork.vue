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
        <label for="file">Upload Images:</label>
        <input
          type="file"
          multiple
          @change="onFileChange"
          id="file"
          accept="image/*"
        />
      </div>
      <div v-if="images.length > 0">
        <h3>Select Cover Image:</h3>
        <div v-for="(image, index) in images" :key="index">
          <img :src="image.preview" :alt="`Image ${index + 1}`" />
          <input
            type="radio"
            :value="index"
            v-model="artwork.coverImageIndex"
          />
          Set as cover
        </div>
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
        images: [], // เก็บไฟล์ที่อัปโหลด
        coverImageIndex: 0, // เก็บดัชนีของไฟล์ที่เลือกเป็นภาพปก
      },
      images: [], // เก็บ preview ของไฟล์ที่อัปโหลด
    };
  },
  methods: {
    onFileChange(event) {
      this.artwork.images = Array.from(event.target.files);
      this.images = this.artwork.images.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
    },
    async submitArtwork() {
      const formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("description", this.artwork.description);
      formData.append("category", this.artwork.category);
      formData.append("tags", this.artwork.tags);
      formData.append("coverImageIndex", this.artwork.coverImageIndex); // ส่งข้อมูลภาพปกไปด้วย

      this.artwork.images.forEach((file) => {
        formData.append("artworkPhotos", file);
      });

      try {
        await this.$store.dispatch("postArtwork", formData);
        this.$router.push("/artworks");
      } catch (error) {
        console.error("Error posting artwork:", error);
        alert("Failed to post artwork. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
  margin: 10px;
}
</style>
