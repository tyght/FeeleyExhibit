<template>
  <div>
    <header v-if="isLoggedIn">
      <h1>FeeleyExhibit</h1>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/user/:userId">Profile</router-link>
        <router-link to="/notifications">Notifications</router-link>
        <button @click="logout">Logout</button>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      // ตรวจสอบสถานะการเข้าสู่ระบบ
      return !!localStorage.getItem("user");
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
}
nav {
  display: flex;
  gap: 10px;
}
</style>
