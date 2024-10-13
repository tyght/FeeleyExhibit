import axios from "axios";

export default () => {
  const token = localStorage.getItem("token"); // ดึง token จาก localStorage
  console.log("Token from localStorage:", token); // ตรวจสอบค่า token

  // ตรวจสอบว่า token มีค่าหรือไม่
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`; // ถ้ามี token ให้นำไปใส่ใน header
  }

  const instance = axios.create({
    baseURL: process.env.BASE_URL || "http://localhost:8081",
    headers: headers,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("การเข้าถึงถูกปฏิเสธ - token อาจไม่ถูกต้อง");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
