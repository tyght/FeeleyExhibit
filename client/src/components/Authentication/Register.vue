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
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
import AuthenService from "@/services/AuthenService";

export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async register() {
      try {
        await AuthenService.register(this.user);
        this.$router.push({ name: "login" });
      } catch (err) {
        console.error("Registration failed:", err);
        this.errorMessage =
          err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : "Registration failed. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
input {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
}
</style>
