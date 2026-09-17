const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Artworks']
    try {
        const result = await mongodb.getDatabase().db().collection('artworks').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Artworks']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artwork id to find an artwork.');
    }
    try {
        const artworkId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('artworks').find({ _id: artworkId }).toArray();
        if (!result[0]) {
            return res.status(404).json({ message: 'Artwork not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createArtwork = async (req, res) => {
    //#swagger.tags=['Artworks']
    try {
        const artwork = {
            title: req.body.title,
            artyear: req.body.artyear,
            period: req.body.period,
            arttype: req.body.arttype,
            artfile: req.body.artfile,
            artistId: req.body.artistId
        };
        const response = await mongodb.getDatabase().db().collection('artworks').insertOne(artwork);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occurred while inserting the artwork.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createArtwork
};