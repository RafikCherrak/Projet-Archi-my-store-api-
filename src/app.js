const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const errorHandler = require('./middlewares/errorsHandling');
const config = require('./config');
const routes = require('./routes');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
const mongoURI = process.env.MONGODB_URI;

// Connexion à la base de données MongoDB
MongoClient.connect(mongoURI)
  .then((client) => {
    const db = client.db(); // Utilisation de la base de données par défaut

    // Injecter la connexion MongoDB dans l'application
    app.locals.db = db;
    console.error('connecting Bien Vu');

    // Reste du code pour la configuration de votre serveur Express
    // ...
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    // Gérer les erreurs de connexion ici
  });

// cors
app.use(
  cors(
    {
      origin: config.frontend_url,
    },
  ),
);

// access to public folder
app.use(express.static(`${__dirname}/public`));

// initial route
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to app-store-api application.' });
});

// api routes prefix
app.use(
  '/api',
  routes,
);

// error handling
app.use(errorHandler);

// run server
app.listen(config.port, () => {
  console.log('server launch');
});

module.exports = app;
