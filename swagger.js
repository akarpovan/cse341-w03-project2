const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Art API',
        description: 'API for managing artists and their artworks'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);