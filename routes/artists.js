const express = require('express');
const router = express.Router();

const artistsController = require('../controllers/artists');

router.get('/', artistsController.getAll);

router.get('/:id', artistsController.getSingle);

router.post('/', artistsController.createArtist);

module.exports = router;