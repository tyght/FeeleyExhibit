<template>
  <div>
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search for artwork..."
    />
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchQuery);
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}
</style>
