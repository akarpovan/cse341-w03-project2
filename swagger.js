const swaggerAutogen = require('swagger-autogen')();

// para desarrollo: no olvidar de generar el archivo swagger.json con "npm run swagger"
/*const doc = {
    info: {
        description: 'API for managing artists and their artworks'
    },
    host: 'localhost:3000',
    schemes: ['http']
};*/
// para produccion: no olvidar de generar el archivo swagger.json con "npm run swagger"
const doc = {
    info: {
        title: 'Art API',
        description: 'API for managing artists and their artworks'
    },
    host: 'cse341-w03-project2.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);