import axios from "axios";
import store from "../store";

export default () => {
  return axios.create({
    baseURL: "http://localhost:3000/", // เปลี่ยน port ให้ตรงกับ server ที่กำลังทำงาน
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
