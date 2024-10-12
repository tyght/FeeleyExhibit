import Vue from "vue";
import Router from "vue-router";

import UserIndex from "@/components/UserProfile/UserIndex.vue";
import UserEdit from "@/components/UserProfile/EditUser.vue";
import UserCreate from "@/components/UserProfile/CreateUser.vue";
import UserShow from "@/components/UserProfile/UserProfile.vue";
import Login from "@/components/Authentication/Login.vue";
import Register from "@/components/Authentication/Register.vue"; // เพิ่มการนำเข้า Register.vue
import HomePage from "@/components/Home Page & Search/HomePage.vue"; // นำเข้า HomePage.vue

import CommentIndex from "@/components/Interaction/CommentsSection.vue";

import ArtworkList from "@/components/ArtManagement/ArtworkList.vue";
import PostArtwork from "@/components/ArtManagement/PostArtwork.vue";
import ArtworkDetail from "@/components/ArtManagement/ArtworkDetail.vue";
import EditArtwork from "@/components/ArtManagement/EditArtwork.vue";

import NotificationList from "@/components/Notifications/NotificationList.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register", // เพิ่มเส้นทาง Register.vue
      name: "register",
      component: Register,
    },
    {
      path: "/users",
      name: "users",
      component: UserIndex,
    },
    {
      path: "/user/edit/:userId",
      name: "user-edit",
      component: UserEdit,
    },
    {
      path: "/user/create",
      name: "user-create",
      component: UserCreate,
    },
    {
      path: "/user/:userId",
      name: "user",
      component: UserShow,
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage, // เพิ่มเส้นทางไปที่ HomePage
    },
    {
      path: "/artworks",
      name: "artworks",
      component: ArtworkList,
    },
    {
      path: "/artwork/create",
      name: "artwork-create",
      component: PostArtwork,
    },
    {
      path: "/artwork/edit/:artworkId",
      name: "artwork-edit",
      component: EditArtwork,
    },
    {
      path: "/artwork/:artworkId",
      name: "artwork",
      component: ArtworkDetail,
    },
    {
      path: "/comments",
      name: "comments",
      component: CommentIndex,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationList,
    },
    {
      path: "*",
      redirect: "/login", // กรณีอื่นๆ ให้ redirect ไปที่หน้า login
    },
  ],
});
