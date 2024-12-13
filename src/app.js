import express from 'express';
import { sequelize } from './config/database.js';

sequelize.authenticate()
  .then(() => console.log('Base de données synchronisée avec Sequelize'))
  .catch(error => console.error('Erreur de synchronisation de la base de données:', error));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());

export { app };
