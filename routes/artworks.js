const express = require('express');
const router = express.Router();

const artworksController = require('../controllers/artworks');
const validation = require('../middleware/validate');

router.get('/', artworksController.getAll);

router.get('/:id', artworksController.getSingle);

router.post('/', validation.saveArtwork, artworksController.createArtwork);

router.put('/:id', validation.saveArtwork, artworksController.updateArtwork);

router.delete('/:id', artworksController.deleteArtwork);

module.exports = router;