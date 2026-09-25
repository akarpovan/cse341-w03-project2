const router = require('express').Router();
const passport = require('passport');

router.use('/api-docs', require('./swagger'));

// ELIMINA O COMENTA ESTA LÍNEA:
// router.get('/', (req, res) => {
//     res.send('Hello World!');
// });

router.use('/artists', require('./artists'));
router.use('/artworks', require('./artworks'));

// Ruta de login
router.get('/login', passport.authenticate('github'), (req, res) => { });

// Ruta de logout
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// Ruta de callback
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/api-docs' }),
    function (req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }
);

module.exports = router;