import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  login(credentials) {
    return Api.post("/login", credentials);
  },
  register(user) {
    return Api.post("/register", user);
  },
};
