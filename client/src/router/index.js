import Vue from "vue";
import Router from "vue-router";

import UserIndex from "@/components/UserProfile/UserIndex.vue";
import UserEdit from "@/components/UserProfile/EditUser.vue";
import UserCreate from "@/components/UserProfile/CreateUser.vue";
import UserShow from "@/components/UserProfile/UserProfile.vue";
import Login from "@/components/Authentication/Login.vue";
import Register from "@/components/Authentication/Register.vue";

import CommentIndex from "@/components/Interaction/CommentsSection.vue";

import ArtworkList from "@/components/ArtManagement/ArtworkList.vue";
import PostArtwork from "@/components/ArtManagement/PostArtwork.vue";
import ArtworkDetail from "@/components/ArtManagement/ArtworkDetail.vue";
import EditArtwork from "@/components/ArtManagement/EditArtwork.vue";

import NotificationList from "@/components/Notifications/NotificationList.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
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
  ],
});

// การตรวจสอบการเข้าสู่ระบบ
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
