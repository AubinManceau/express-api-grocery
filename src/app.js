import express from 'express';
import db from './config/database.js';
import userRoutes from './routes/users.js';

db.authenticate()
  .then(() => console.info("Base de données synchronisée avec Sequelize"))
  .catch((error) =>
    console.error("Erreur de synchronisation de la base de données:", error),
  );

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use(express.json());
app.use("/api/v1/users", userRoutes);

export default app;
