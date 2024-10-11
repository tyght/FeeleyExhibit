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
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
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
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      if (!this.credentials.email || !this.credentials.password) {
        this.errorMessage = "Please fill in all fields.";
        return;
      }
      try {
        const response = await AuthenService.login(this.credentials);
        // บันทึกข้อมูลผู้ใช้ลงใน Vuex
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("setToken", response.data.token);
        this.$router.push({ name: "HomePage" });
      } catch (err) {
        console.error("Login failed:", err);
        this.errorMessage =
          err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : "Login failed. Please try again.";
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
.error-message {
  color: red;
  text-align: center;
  margin-bottom: 10px;
}
</style>
