const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const result = await mongodb.getDatabase().db().collection('artists').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id to find an artist.');
    }
    try {
        const artistId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('artists').find({ _id: artistId }).toArray();
        if (!result[0]) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    try {
        const artist = {
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            dob: req.body.dob,
            dod: req.body.dod,
            country: req.body.country,
            localArtist: req.body.localArtist
        };
        const response = await mongodb.getDatabase().db().collection('artists').insertOne(artist);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occurred while inserting the artist.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id to update an artist.');
    }
    try {
        const artistId = new ObjectId(req.params.id);
        const artist = {
            fname: req.body.fname,
            mname: req.body.mname,
            lname: req.body.lname,
            dob: req.body.dob,
            dod: req.body.dod,
            country: req.body.country,
            localArtist: req.body.localArtist
        };
        const response = await mongodb.getDatabase().db().collection('artists').replaceOne({ _id: artistId }, artist);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the artist.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteArtist = async (req, res) => {
    //#swagger.tags=['Artists']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid artist id to delete an artist.');
    }
    try {
        const artistId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('artists').deleteOne({ _id: artistId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the artist.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createArtist,
    updateArtist,
    deleteArtist
};