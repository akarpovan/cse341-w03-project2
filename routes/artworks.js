const express = require('express');
const router = express.Router();

const artworksController = require('../controllers/artworks');

router.get('/', artworksController.getAll);

router.get('/:id', artworksController.getSingle);

router.post('/', artworksController.createArtwork);

module.exports = router;