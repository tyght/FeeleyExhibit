<template>
  <header v-if="isLoggedIn">
    <h1>FeeleyExhibit</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link :to="`/user/${userId}`">Profile</router-link>
      <router-link to="/notifications">Notifications</router-link>
      <button @click="logout">Logout</button>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    isLoggedIn() {
      return !!this.user; // ตรวจสอบสถานะการเข้าสู่ระบบจาก Vuex state
    },
    userId() {
      return this.user ? this.user.id : null; // ดึง userId จาก Vuex
    },
  },
  methods: {
    logout() {
      this.$store.commit("setToken", null); // ล้าง token ใน Vuex
      this.$store.commit("setUser", null); // ล้างข้อมูล user ใน Vuex
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
