<template>
  <div>
    <h1>Upload Material:</h1>
    <form enctype="multipart/form-data" novalidate>
      <div class="dropbox">
        <input
          type="file"
          multiple
          :name="uploadFieldName"
          :disabled="isSaving"
          @change="handleFileChange($event)"
          accept="image/*"
          class="input-file"
        />
        <p v-if="isInitial">
          Drag your file(s) here to begin<br />
          or click to browse
        </p>
        <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        <p v-if="isSuccess">Upload Successful.</p>
        <p v-if="isFailed">Upload Failed. Please try again.</p>
        <!-- แจ้งเตือนเมื่อเกิดข้อผิดพลาด -->
      </div>
    </form>
  </div>
</template>

<script>
import UploadService from "../../services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      uploadError: null,
      currentStatus: STATUS_INITIAL, // ตั้งค่าเริ่มต้น
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      fileCount: 0, // เพิ่มเพื่อแสดงจำนวนไฟล์
    };
  },
  methods: {
    handleFileChange(event) {
      const fileList = event.target.files;
      if (fileList.length) {
        this.fileCount = fileList.length; // อัปเดตจำนวนไฟล์
        const formData = new FormData();
        Array.from(fileList).forEach((file) => {
          formData.append(this.uploadFieldName, file, file.name);
          this.uploadedFileNames.push(file.name);
        });
        this.save(formData);
      }
    },
    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;
        this.clearUploadResult();
      } catch (error) {
        console.error(error);
        this.currentStatus = STATUS_FAILED; // ตั้งค่าสถานะผิดพลาด
        alert("Failed to upload files. Please try again."); // แจ้งเตือนผู้ใช้
      }
    },
    clearUploadResult() {
      setTimeout(() => {
        this.currentStatus = STATUS_INITIAL; // รีเซ็ตสถานะ
      }, 5000);
    },
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px;
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki;
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
