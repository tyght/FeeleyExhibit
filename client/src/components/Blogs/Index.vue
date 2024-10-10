<template>
  <div>
    <h2>Get all blogs</h2>
    <p><button v-on:click="logout">Logout</button></p>
    <h4>จำนวน blog {{ blogs.length }}</h4>
    <p><button v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
    <div class="blog-container">
      <div v-for="blog in blogs" v-bind:key="blog.id" class="blog-card">
        <img
          :src="BASE_URL + blog.thumbnail"
          alt="Blog Thumbnail"
          v-if="blog.thumbnail"
          class="blog-thumbnail"
        />
        <p>id: {{ blog.id }}</p>
        <p>title: {{ blog.title }}</p>
        <p>
          <button v-on:click="navigateTo('/blog/' + blog.id)">
            ดูรายละเอียด
          </button>
        </p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/",
    };
  },
  async created() {
    await this.refreshData(); // เรียก refreshData ใน created
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setBlog", null);
      this.$router.push({ name: "login" });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async refreshData() {
      try {
        const response = await BlogsService.index();
        this.blogs = response.data || []; // ตรวจสอบข้อมูล
      } catch (err) {
        console.error("Error fetching blogs:", err);
        alert("Error fetching blogs. Please try again."); // แจ้งผู้ใช้
      }
    },
  },
};
</script>

<style scoped>
.blog-container {
  display: flex; /* ใช้ Flexbox */
  flex-wrap: wrap; /* ให้ยืดหยุ่นในแถว */
  justify-content: space-between; /* จัดเรียงให้มีช่องว่างระหว่างบล็อก */
}

.blog-card {
  width: calc(50% - 10px); /* ขนาดของแต่ละบล็อก */
  margin-bottom: 20px; /* ระยะห่างระหว่างแถว */
}

.blog-thumbnail {
  max-width: 200px; /* ปรับขนาดภาพ thumbnail */
  height: auto; /* ให้รักษาสัดส่วนของภาพ */
  margin-bottom: 10px; /* เพิ่มระยะห่างด้านล่าง */
}
</style>
