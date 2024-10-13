import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import AuthenService from "@/services/AuthenService";
import ArtworksService from "@/services/ArtworksService";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState({
      storage: window.localStorage, // ตรวจสอบว่าใช้ localStorage
    }),
  ],
  state: {
    user: null,
    token: null,
    artworks: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearUserAndToken(state) {
      state.user = null;
      state.token = null;
    },
    addArtwork(state, artwork) {
      state.artworks.push(artwork); // จัดการการเพิ่มผลงานศิลปะ
    },
  },
  getters: {
    isUserLoggedIn: (state) => {
      return !!state.token && !!state.user; // ตรวจสอบว่ามี token และ user อยู่หรือไม่
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await AuthenService.login(credentials);
        const { user, token } = response.data;

        // บันทึก token และ user ใน state และ localStorage
        localStorage.setItem("token", token);
        commit("setUser", user);
        commit("setToken", token);
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    logout({ commit }) {
      // ลบข้อมูลการเข้าสู่ระบบจาก state และ localStorage
      commit("clearUserAndToken");
      localStorage.removeItem("token");
    },
    async postArtwork({ commit }, artworkData) {
      try {
        const response = await ArtworksService.postArtwork(artworkData);
        commit("addArtwork", response.data);
      } catch (error) {
        console.error("Error posting artwork:", error);
        throw error;
      }
    },
  },
});
