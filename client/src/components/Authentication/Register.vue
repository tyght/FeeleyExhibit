<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <p>
        <label for="username">Username:</label>
        <input type="text" v-model="user.username" />
      </p>
      <p>
        <label for="email">Email:</label>
        <input type="email" v-model="user.email" />
      </p>
      <p>
        <label for="password">Password:</label>
        <input type="password" v-model="user.password" />
      </p>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import AuthenService from "@/services/AuthenService";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "", // เปลี่ยนจาก name เป็น username
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenService.register(this.user);
        console.log("Registration successful:", response);
        this.$router.push({ name: "login" });
      } catch (err) {
        console.error("Registration failed:", err);
      }
    },
  },
};
</script>
