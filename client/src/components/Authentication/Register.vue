<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <p>
        <label for="name">Name:</label>
        <input type="text" v-model="user.name" />
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
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
        name: "",
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
          err.response?.data?.error || "Registration failed. Please try again.";
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
.error {
  color: red;
  font-weight: bold;
}
</style>
