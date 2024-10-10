import Api from "./Api";

export default {
    index() {
        return Api().get("artworks");
    },
    show(artworkId) {
        return Api().get(`artworks/${artworkId}`);
    },
    create(artwork) {
        return Api().post("artworks", artwork);
    },
    update(artworkId, artwork) {
        return Api().put(`artworks/${artworkId}`, artwork);
    },
    delete(artwork) {
        return Api().delete(`artworks/${artwork.id}`);
    },
};