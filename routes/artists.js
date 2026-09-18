const express = require('express');
const router = express.Router();

const artistsController = require('../controllers/artists');
const validation = require('../middleware/validate');

router.get('/', artistsController.getAll);

router.get('/:id', artistsController.getSingle);

router.post('/', validation.saveArtist, artistsController.createArtist);

router.put('/:id', validation.saveArtist, artistsController.updateArtist);

router.delete('/:id', artistsController.deleteArtist);

module.exports = router;