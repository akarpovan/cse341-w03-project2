const swaggerAutogen = require('swagger-autogen')();

/*const doc = {
    info: {
        title: 'Art API',
        description: 'API for managing artists and their artworks'
    },
    host: 'localhost:3000',
    schemes: ['http']
};*/
// Render define automáticamente la variable de entorno RENDER_EXTERNAL_HOSTNAME con su dominio real 
// (cse341-w03-project2.onrender.com)
const doc = {
    info: {
        title: 'Art API',
        description: 'API for managing artists and their artworks'
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
    schemes: [process.env.RENDER_EXTERNAL_HOSTNAME ? 'https' : 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);