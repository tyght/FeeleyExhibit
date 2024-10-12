import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import ArtworksService from "@/services/ArtworksService"; // นำเข้า service สำหรับงานศิลปะ

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    artworks: [], // เพิ่ม state สำหรับเก็บงานศิลปะทั้งหมด
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
    setArtworks(state, artworks) {
      state.artworks = artworks; // กำหนดงานศิลปะใน state
    },
    addArtwork(state, artwork) {
      state.artworks.push(artwork); // เพิ่มงานศิลปะใหม่ใน state
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    async fetchArtworks({ commit }) {
      try {
        const response = await ArtworksService.getAllArtworks();
        commit("setArtworks", response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    },
    async postArtwork({ commit }, artworkData) {
      try {
        const response = await ArtworksService.postArtwork(artworkData);
        commit("addArtwork", response.data); // เมื่อโพสต์สำเร็จให้เพิ่มงานศิลปะใหม่ใน state
      } catch (error) {
        console.error("Error posting artwork:", error);
        throw error;
      }
    },
  },
});
