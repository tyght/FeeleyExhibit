<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
    isLoggedIn() {
      return !!this.user;
    },
    userId() {
      return this.user ? this.user.id : null;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
};
</script>
