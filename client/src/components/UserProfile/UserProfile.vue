<template>
  <div>
    <h2>{{ userProfile.name }}</h2>
    <img :src="userProfile.avatarUrl" alt="User Avatar" class="avatar" />
    <p><strong>Email:</strong> {{ userProfile.email }}</p>
    <div class="artworks">
      <h3>Your Artworks</h3>
      <ArtworkList :userId="userProfile.id" />
    </div>
  </div>
</template>

<script>
import ArtworkList from "@/components/ArtManagement/ArtworkList.vue";

export default {
  name: "UserProfile",
  components: {
    ArtworkList,
  },
  data() {
    return {
      userProfile: {
        id: null,
        name: "",
        email: "",
        avatarUrl: "",
      },
    };
  },
  async created() {
    try {
      const userId = this.$route.params.userId;
      const response = await this.$store.dispatch("fetchUserProfile", userId);
      this.userProfile = response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to load user profile. Please try again.");
    }
  },
};
</script>

<style scoped>
.avatar {
  width: 150px;
  height: auto;
  border-radius: 50%;
  margin-bottom: 20px;
}
.artworks {
  margin-top: 30px;
}
</style>
