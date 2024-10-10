const Artwork = require("../models/Artwork");

exports.getAllArtworks = async(req, res) => {
    try {
        const artworks = await Artwork.find();
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching artworks" });
    }
};

exports.createArtwork = async(req, res) => {
    const artwork = new Artwork(req.body);
    try {
        await artwork.save();
        res.status(201).json(artwork);
    } catch (error) {
        res.status(400).json({ message: "Error creating artwork" });
    }
};