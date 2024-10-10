<template>
  <div>
    <h3>Notifications</h3>
    <ul>
      <li v-for="notification in notifications" :key="notification.id">
        {{ notification.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NotificationList",
  data() {
    return {
      notifications: [],
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch("fetchNotifications");
      this.notifications = response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
}
</style>
