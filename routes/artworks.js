const express = require('express');
const router = express.Router();

const artworksController = require('../controllers/artworks');
const validation = require('../middleware/validate');

//Se agrego para autenticaciones y se usa en metodos: post, put, delete.
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', artworksController.getAll);

router.get('/:id', artworksController.getSingle);

router.post('/', isAuthenticated, validation.saveArtwork, artworksController.createArtwork);

router.put('/:id', isAuthenticated, validation.saveArtwork, artworksController.updateArtwork);

router.delete('/:id', isAuthenticated, artworksController.deleteArtwork);

module.exports = router;