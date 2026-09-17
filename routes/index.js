const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/artists', require('./artists'));
router.use('/artworks', require('./artworks'));

module.exports = router;