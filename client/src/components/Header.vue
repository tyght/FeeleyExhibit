<template>
  <div class="header">
    <h1>FeeleyExhibit</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="isUserLoggedIn">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="isUserLoggedIn">
          <router-link to="/notifications">Notifications</router-link>
        </li>
        <li v-if="isUserLoggedIn"><button @click="logout">Logout</button></li>
        <li v-else><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    isUserLoggedIn() {
      const loggedIn = this.$store.getters.isUserLoggedIn;
      console.log("Header.vue - Is User Logged In:", loggedIn);
      return loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
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
