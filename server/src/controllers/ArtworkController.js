// controllers/ArtworkController.js
const Artwork = require("../models/Artwork");

module.exports = {
  async create(req, res) {
    try {
      const { title, description, category, createdBy } = req.body;

      // ตรวจสอบว่ามีไฟล์ภาพอัปโหลดหรือไม่
      const imagePath = req.file ? req.file.path : null;

      const artwork = await Artwork.create({
        title,
        description,
        category,
        imagePath, // เก็บ path ของไฟล์รูปภาพ
        createdBy,
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
      const imagePath = req.file ? req.file.path : artwork.imagePath;

      await artwork.update({
        ...req.body,
        imagePath, // อัปเดต imagePath ถ้ามีการอัปโหลดรูปใหม่
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

  async put(req, res) {
    try {
      const artwork = await Artwork.findByPk(req.params.artworkId);
      if (!artwork) {
        return res.status(404).send({ error: "ไม่พบผลงานศิลปะ" });
      }

      // ตรวจสอบว่ามีไฟล์ภาพใหม่อัปโหลดหรือไม่
      const imagePath = req.file ? req.file.path : artwork.imagePath;

      await artwork.update({
        ...req.body,
        imagePath, // อัปเดต imagePath ถ้ามีการอัปโหลดรูปใหม่
      });

      res.status(200).send(artwork);
    } catch (err) {
      console.error("Error updating artwork:", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการแก้ไขผลงานศิลปะ" });
    }
  },
};
