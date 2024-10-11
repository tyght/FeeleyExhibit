<template>
  <div id="app">
    <navigationBar />
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    const isLoggedIn = !!localStorage.getItem("token"); // ตรวจสอบว่ามี token ใน localStorage หรือไม่
    if (!isLoggedIn) {
      this.$router.push({ name: "login" }); // ถ้าไม่ได้ล็อกอินให้ย้ายไปที่หน้า login
    }
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* Fade transition */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.5s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
