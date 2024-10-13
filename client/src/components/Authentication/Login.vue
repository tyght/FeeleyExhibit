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
      <button type="submit">Login</button>
      <p>
        ยังไม่มีบัญชีใช่ไหม?
        <button @click="goToRegister" class="register-button">Register</button>
      </p>
    </form>
  </div>
</template>

<script>
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
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn; // ใช้ Vuex getter เพื่อตรวจสอบการเข้าสู่ระบบ
    },
  },
  methods: {
    async login() {
      try {
        // เรียกใช้งาน Vuex action สำหรับการ login
        await this.$store.dispatch("login", this.credentials);

        // นำผู้ใช้ไปยังหน้า HomePage หลังจาก login สำเร็จ
        this.$router.push({ name: "HomePage" }).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            throw err;
          }
        });
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
    goToRegister() {
      this.$router.push({ name: "register" }); // เปลี่ยนเส้นทางไปยังหน้า Register
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
.register-button {
  background: none;
  border: none;
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
