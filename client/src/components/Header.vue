<template>
  <div class="header">
    <h1>FeeleyExhibit</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/notifications">Notifications</router-link></li>
        <li><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #4caf50;
  color: white;
}
nav ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
}
nav li {
  cursor: pointer;
}
button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  text-decoration: underline;
}
</style>
