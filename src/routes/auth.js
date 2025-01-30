import express from "express";
import authCtrl from "../controllers/authController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Connexion à un compte utilisateur.
 *     description: Authentification d'un utilisateur en utilisant son email et son mot de passe.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "test@test.fr"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "test1234"
 *     responses:
 *       '200':
 *         description: Connexion réussie avec génération d'un token JWT.
 *         headers:
 *           Authorization:
 *             description: JWT à inclure dans les futures requêtes
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *                   example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Les champs email et mot de passe sont requis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email and password are required"
 *       '401':
 *         description: Échec de l'authentification (email ou mot de passe incorrect, ou compte supprimé).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Incorrect login/password pair"
 */
router.post("/login", authCtrl.login);
/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Création d'un compte utilisateur.
 *     description: Crée un nouveau compte utilisateur avec différents rôles possibles.
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'email de l'utilisateur
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "password123"
 *               first_name:
 *                 type: string
 *                 description: Prénom de l'utilisateur
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 description: Nom de famille de l'utilisateur
 *                 example: "Doe"
 *               role:
 *                 type: string
 *                 description: Rôle de l'utilisateur (client, admin, commercial, supplier, deliveryMan, logisticManager)
 *                 example: "client"
 *     responses:
 *       '201':
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message confirmant l'inscription réussie
 *                   example: "John Doe was successfully registered"
 *       '400':
 *         description: Champs obligatoires manquants ou rôle invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email, password, role, firstname and lastname are required"
 *       '409':
 *         description: Email déjà existant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "This email is already saved"
 */
router.post("/signup", authCtrl.signup);

export default router;
