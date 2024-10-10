<template>
  <div>
    <div class="nv-navbar">
      <ul class="nav">
        <li><router-link :to="{ name: 'blogs' }">Blogs</router-link></li>
        <li><router-link :to="{ name: 'users' }">Users</router-link></li>
        <li><router-link :to="{ name: 'comments' }">Comments</router-link></li>
        <!-- if isLogin is true, show logout menu. otherwise, show login menu-->
        <li><router-link :to="{ name: 'login' }">Login</router-link></li>  
      </ul>
    </div>
  </div>
</template>
<script>

export default {

  methods:{
    isLogin(){
      return this.$store.getters.isUserLoggedIn;
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push({name: 'login'});
    }
  }
};
</script>
<style scoped>
.nv-navbar {
  background-color: palegoldenrod;
  width: 100%;
  height: 20px;
  padding: 10px 0px 10px 0px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: gray;
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: darkslategrey;
}
.nv-navbar .nav li a.router-link-active {
  background-color: gold;
  color: darkslategrey;
}
.clearfix {
  clear: left;
}
</style>
