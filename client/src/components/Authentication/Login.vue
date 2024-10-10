<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <p>
        <label for="email">Email:</label>
        <input type="email" v-model="credentials.email" />
      </p>
      <p>
        <label for="password">Password:</label>
        <input type="password" v-model="credentials.password" />
      </p>
      <div class="button-group">
        <button type="submit" class="action-button">Login</button>
        <button @click.prevent="goToRegister" class="action-button">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import AuthenService from "@/services/AuthenService";

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        await AuthenService.login(this.credentials);
        this.$router.push({ name: "HomePage" });
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
    goToRegister() {
      this.$router.push({ name: "register" });
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
.button-group {
  display: flex;
  justify-content: space-between;
}
.action-button {
  padding: 10px 20px;
  margin: 10px 0;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.action-button:hover {
  background-color: #45a049;
}
</style>
