<template>
  <div>
    <h2>Get all blogs</h2>
    <p><button v-on:click="logout">Logout</button></p>
    <h4>จำนวน blog {{ blogs.length }}</h4>
    <p><button v-on:click="navigateTo('/blog/create')">สร้าง blog</button></p>
    <div v-for="blog in blogs" v-bind:key="blog.id">
      <img
        :src="BASE_URL + blog.thumbnail"
        alt="Blog Thumbnail"
        v-if="blog.thumbnail"
        class="blog-thumbnail"
      />
      <p>id: {{ blog.id }}</p>
      <p>title: {{ blog.title }}</p>
      <p>content: {{ blog.content }}</p>
      <p>category: {{ blog.category }}</p>
      <p>status: {{ blog.status }}</p>
      <p>
        <button v-on:click="navigateTo('/blog/' + blog.id)">ดู blog</button>
        <button v-on:click="navigateTo('/blog/edit/' + blog.id)">
          แก้ไข blog
        </button>
        <button v-on:click="deleteBlog(blog)">ลบข้อมูล</button>
      </p>
      <hr />
    </div>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";

export default {
  data() {
    return {
      blogs: [],
      BASE_URL: "http://localhost:8081/assets/uploads/", // กำหนด BASE_URL
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
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogsService.delete(blog);
          await this.refreshData(); // เรียก refreshData หลังจากลบ
        } catch (err) {
          console.error("Error deleting blog:", err); // ปรับปรุงการจัดการข้อผิดพลาด
          alert("Error deleting blog. Please try again."); // แจ้งผู้ใช้
        }
      }
    },
    async refreshData() {
      try {
        this.blogs = (await BlogsService.index()).data;
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    },
  },
};
</script>

<style scoped>
.blog-thumbnail {
  max-width: 200px; /* ปรับขนาดภาพ thumbnail */
  height: auto; /* ให้รักษาสัดส่วนของภาพ */
  margin-bottom: 10px; /* เพิ่มระยะห่างด้านล่าง */
}
</style>
