//ArtworksService.js
import Api from "@/services/Api";

export default {
  postArtwork(formData) {
    const token = localStorage.getItem("token");
    return Api().post("artwork", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getAllArtworks() {
    return Api().get("artworks");
  },
  getMyArtworks() {
    const token = localStorage.getItem("token");
    return Api().get("/my-artworks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
