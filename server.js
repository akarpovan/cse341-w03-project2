const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// --- CONFIGURACIÓN DE SESIÓN ---
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false, // Importante: false para no crear sesiones vacías
    cookie: { secure: false } // false porque estamos en localhost (http)
}));

// --- INICIALIZAR PASSPORT ---
app.use(passport.initialize());
app.use(passport.session());

// --- CORS ---
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(cors({ origin: '*' }));

// --- ESTRATEGIA DE GITHUB ---
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

// --- SERIALIZACIÓN ---
passport.serializeUser((user, done) => {
    done(null, user); // Guardamos el objeto completo
});

passport.deserializeUser((user, done) => {
    done(null, user); // Devolvemos el objeto completo
});

// --- RUTAS ---
// Todas las rutas (incluyendo /login, /logout, /github/callback) están en routes/index.js
app.use('/', require('./routes'));

// --- RUTA RAÍZ (para probar el login) ---
/*app.get('/', (req, res) => {
    // Si el usuario está logueado, muestra su nombre. Si no, "Logged Out".
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});*/
app.get('/', (req, res) => {
    if (req.session.user) {
        // Usa username si displayName es null
        const name = req.session.user.displayName || req.session.user.username || 'Usuario';
        res.send(`Logged in as ${name}`);
    } else {
        res.send("Logged Out");
    }
});

// --- MANEJO DE ERRORES ---
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// --- INICIAR SERVIDOR ---
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => console.log(`Database is listening and node running on port ${port}`));
    }
});