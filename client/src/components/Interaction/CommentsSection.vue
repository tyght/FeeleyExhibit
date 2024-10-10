<template>
  <div class="comments-section">
    <h3>Comments</h3>
    <div v-for="comment in comments" :key="comment.id" class="comment">
      <p>
        <strong>{{ comment.user }}:</strong> {{ comment.text }}
      </p>
    </div>
    <textarea v-model="newComment" placeholder="Add a comment..." />
    <button @click="addComment">Post Comment</button>
  </div>
</template>

<script>
export default {
  name: "CommentsSection",
  props: {
    artworkId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: "",
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch(
        "fetchComments",
        this.artworkId
      );
      this.comments = response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },
  methods: {
    async addComment() {
      if (this.newComment.trim() !== "") {
        try {
          const response = await this.$store.dispatch("addComment", {
            artworkId: this.artworkId,
            text: this.newComment,
          });
          this.comments.push(response.data);
          this.newComment = "";
        } catch (error) {
          console.error("Error adding comment:", error);
          alert("Failed to add comment. Please try again.");
        }
      }
    },
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 30px;
}
.comment {
  margin-bottom: 15px;
}
textarea {
  width: 100%;
  height: 60px;
  margin-top: 10px;
}
button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
