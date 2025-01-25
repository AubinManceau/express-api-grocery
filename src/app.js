import express from 'express';
import db from './config/database.js';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import serviceRoutes from './routes/services.js';
import orderRoutes from './routes/orders.js';
import deliveryRoutes from './routes/deliveries.js';
import messageRoutes from './routes/messages.js';
import assignmentRequestRoutes from './routes/assignmentRequests.js';

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
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/delivery-tours", deliveryRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/assignment-requests", assignmentRequestRoutes);

app.get("/", (req, res) => {
  res.sendFile("./src/index.html", { root: "." });
});

export default app;
