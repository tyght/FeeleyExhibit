import Api from "@/services/Api";

export default {
  getAllArtworks() {
    return Api().get("artworks");
  },
  getArtworkById(id) {
    return Api().get(`artwork/${id}`);
  },
  postArtwork(artworkData) {
    return Api().post("artwork", artworkData);
  },
  getMyArtworks() {
    return Api().get("my-artworks"); // API สำหรับดึงงานศิลปะของผู้ใช้เอง
  },
};
