import Api from "@/services/Api";

export default {
  register(credentials) {
    return Api().post("user", credentials);
  },
  login(credentials) {
    return Api()
      .post("login", credentials)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token); // เก็บ token หลังจาก login
        return response;
      });
  },
};
