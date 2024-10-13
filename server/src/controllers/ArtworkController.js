const Artwork = require("../models/Artwork");

module.exports = {
  async create(req, res) {
    try {
      const { title, description, category, tags, coverImageIndex } = req.body;

      // ตรวจสอบว่ามีไฟล์ถูกอัปโหลดเข้ามาหรือไม่
      if (!req.files || req.files.length === 0) {
        return res.status(400).send({ error: "กรุณาอัปโหลดไฟล์ภาพ" });
      }

      // สร้างรายการเก็บไฟล์ที่ถูกอัปโหลด
      const images = req.files.map((file) => file.path);

      // ตรวจสอบว่า coverImageIndex ที่ส่งมามีค่าที่ถูกต้องหรือไม่
      if (coverImageIndex >= images.length || coverImageIndex < 0) {
        return res.status(400).send({ error: "ค่าของภาพปกไม่ถูกต้อง" });
      }

      // เลือกภาพปกจากไฟล์ที่ถูกอัปโหลด
      const coverImagePath = images[coverImageIndex];

      // สร้างงานศิลปะในฐานข้อมูล
      const { user } = req; // ดึงข้อมูลผู้ใช้ที่ถูกตรวจสอบสิทธิ์
      const artwork = await Artwork.create({
        title,
        description,
        category,
        tags,
        images: JSON.stringify(images), // เก็บรายการไฟล์ทั้งหมดเป็น JSON
        coverImage: coverImagePath, // เก็บไฟล์ภาพที่เป็นภาพปก
        createdBy: user.id, // ดึง id จากผู้ใช้ที่เข้าสู่ระบบ
      });

      res.status(201).send(artwork);
    } catch (err) {
      console.error("Error creating artwork:", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการสร้างผลงานศิลปะ" });
    }
  },

  async index(req, res) {
    try {
      const artworks = await Artwork.findAll();
      res.status(200).send(artworks);
    } catch (err) {
      console.error("Error fetching artworks:", err);
      res
        .status(500)
        .send({ error: "มีข้อผิดพลาดในการเรียกดูรายการผลงานศิลปะ" });
    }
  },

  async show(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.artworkId);
      if (!artwork) {
        return res.status(404).send({ error: "ไม่พบผลงานศิลปะ" });
      }
      res.status(200).send(artwork);
    } catch (err) {
      console.error("Error fetching artwork details:", err);
      res
        .status(500)
        .send({ error: "มีข้อผิดพลาดในการเรียกดูรายละเอียดผลงานศิลปะ" });
    }
  },

  async update(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.artworkId);
      if (!artwork) {
        return res.status(404).send({ error: "ไม่พบผลงานศิลปะ" });
      }

      // ตรวจสอบว่ามีไฟล์ภาพใหม่อัปโหลดหรือไม่
      const newImages = req.files
        ? req.files.map((file) => file.path)
        : JSON.parse(artwork.images);
      const coverImagePath =
        req.body.coverImageIndex !== undefined
          ? newImages[req.body.coverImageIndex]
          : artwork.coverImage;

      await artwork.update({
        ...req.body,
        images: JSON.stringify(newImages), // อัปเดตไฟล์ภาพใหม่
        coverImage: coverImagePath, // อัปเดตภาพปกใหม่
      });

      res.status(200).send(artwork);
    } catch (err) {
      console.error("Error updating artwork:", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการแก้ไขผลงานศิลปะ" });
    }
  },

  async remove(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.artworkId);
      if (!artwork) {
        return res.status(404).send({ error: "ไม่พบผลงานศิลปะ" });
      }
      await artwork.destroy();
      res.status(204).send();
    } catch (err) {
      console.error("Error deleting artwork:", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการลบผลงานศิลปะ" });
    }
  },

  async getMyArtworks(req, res) {
    try {
      const userId = req.user.id; // จากการตรวจสอบสิทธิ์แล้วดึง userId
      const artworks = await Artwork.findAll({ where: { createdBy: userId } });
      res.status(200).send(artworks);
    } catch (err) {
      console.error("Error fetching user's artworks:", err);
      res
        .status(500)
        .send({ error: "มีข้อผิดพลาดในการดึงผลงานศิลปะของผู้ใช้" });
    }
  },
};
