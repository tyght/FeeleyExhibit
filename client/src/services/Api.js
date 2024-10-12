import axios from "axios";

export default () => {
  return axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:8081", // ใช้ BASE_URL จาก environment
    headers: {
      "Content-Type": "application/json",
    },
  });
};
