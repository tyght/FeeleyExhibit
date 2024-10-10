// controllers/ArtworkController.js
const Artwork = require("../models/Artwork");

module.exports = {
    async create(req, res) {
        try {
            const { title, description, category, createdBy } = req.body;
            const artwork = await Artwork.create({
                title,
                description,
                category,
                imagePath: req.file.path,
                createdBy,
            });
            res.status(201).send(artwork);
        } catch (err) {
            res.status(500).send({ error: "มีข้อผิดพลาดในการสร้างผลงานศิลปะ" });
        }
    },

    async index(req, res) {
        try {
            const artworks = await Artwork.findAll();
            res.status(200).send(artworks);
        } catch (err) {
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
            await artwork.update(req.body);
            res.status(200).send(artwork);
        } catch (err) {
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
            res.status(500).send({ error: "มีข้อผิดพลาดในการลบผลงานศิลปะ" });
        }
    },
};