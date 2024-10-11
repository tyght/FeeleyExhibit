<template>
  <header v-if="isLoggedIn">
    <h1>FeeleyExhibit</h1>
    <nav>
      <router-link to="/HomePage">Home</router-link>
      <router-link :to="`/user/${userId}`">Profile</router-link>
      <router-link to="/notifications">Notifications</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("user");
    },
    userId() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        return user ? user.id : null;
      } catch (error) {
        return null;
      }
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
header {
  background-color: green;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}

nav {
  display: flex;
  gap: 15px;
}

button {
  padding: 8px 12px;
  background-color: #ff6666;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff4d4d;
}
</style>
