<template>
  <div>
    <h1>Welcome to FeeleyExhibit</h1>
    <SearchBar />
    <div class="artwork-list">
      <ArtworkList />
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/Home Page & Search/SearchBar.vue";
import ArtworkList from "@/components/ArtManagement/ArtworkList.vue";

export default {
  name: "HomePage",
  components: {
    SearchBar,
    ArtworkList,
  },
};
</script>

<style scoped>
.artwork-list {
  margin-top: 20px;
}
</style>
