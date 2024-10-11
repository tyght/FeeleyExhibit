<template>
  <div>
    <h2>User List</h2>
    <ul>
      <!-- List of users -->
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserIndex",
  data() {
    return {
      users: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    };
  },
};
</script>

<style scoped>
/* Styles for UserIndex */
</style>
