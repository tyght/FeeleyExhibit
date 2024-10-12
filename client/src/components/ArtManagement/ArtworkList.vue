<template>
  <div>
    <h1>Artworks</h1>

    <!-- Navigation between sections -->
    <div class="tabs">
      <button
        @click="currentTab = 'discover'"
        :class="{ active: currentTab === 'discover' }"
      >
        ค้นพบ
      </button>
      <button
        @click="currentTab = 'myGallery'"
        :class="{ active: currentTab === 'myGallery' }"
      >
        แกลลอรี่ของฉัน
      </button>
    </div>

    <!-- Discover Section -->
    <div v-if="currentTab === 'discover'">
      <h2>ค้นพบ</h2>
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

    <!-- My Gallery Section -->
    <div v-if="currentTab === 'myGallery'">
      <h2>แกลลอรี่ของฉัน</h2>
      <button @click="navigateToPostArtwork">โพสต์งานศิลปะใหม่</button>
      <div v-for="artwork in myArtworks" :key="artwork.id">
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
  </div>
</template>

<script>
import ArtworksService from "@/services/ArtworksService";
export default {
  data() {
    return {
      currentTab: "discover", // ใช้เพื่อเก็บแท็บที่เลือก
      artworks: [],
      myArtworks: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
    await this.loadArtworks();
    await this.loadMyArtworks(); // โหลดงานศิลปะของผู้ใช้
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
    async loadMyArtworks() {
      try {
        const response = await ArtworksService.getMyArtworks(); // สมมติว่ามี API สำหรับดึงงานศิลปะของผู้ใช้เอง
        this.myArtworks = response.data;
      } catch (err) {
        console.error("Error fetching my artworks:", err);
      }
    },
    navigateToArtworkDetail(id) {
      this.$router.push(`/artwork/${id}`);
    },
    navigateToPostArtwork() {
      this.$router.push("/artwork/create");
    },
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
button {
  padding: 10px;
  border: none;
  background-color: lightgrey;
  cursor: pointer;
  outline: none;
}
button.active {
  background-color: grey;
  color: white;
}
img {
  width: 200px;
  height: auto;
  margin-bottom: 10px;
}
</style>
