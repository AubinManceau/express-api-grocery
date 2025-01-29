import express from 'express';
import userCtrl from "../controllers/userController.js";
import auth from "../middlewares/authentification.js"

const router = express.Router();

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Connexion à un compte utilisateur.
 *     description: Authentification d'un utilisateur en utilisant son email et son mot de passe.
 *     tags:
 *       - Users
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
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *                 example: "123456"
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
router.post("/login", userCtrl.login);
/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Création d'un compte utilisateur.
 *     description: Crée un nouveau compte utilisateur avec différents rôles possibles.
 *     tags:
 *       - Users
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
router.post("/signup", userCtrl.signup);
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Récupération de la liste des utilisateurs.
 *     description: Récupère une liste d'utilisateurs avec leurs rôles associés (client, admin, commercial, supplier, deliveryMan, logisticManager).
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user:
 *                         type: object
 *                         properties:
 *                           user_id:
 *                             type: integer
 *                             description: Identifiant unique de l'utilisateur
 *                             example: 1
 *                           email:
 *                             type: string
 *                             description: Email de l'utilisateur
 *                             example: "user@example.com"
 *                           first_name:
 *                             type: string
 *                             description: Prénom de l'utilisateur
 *                             example: "John"
 *                           last_name:
 *                             type: string
 *                             description: Nom de l'utilisateur
 *                             example: "Doe"
 *                       role:
 *                         type: string
 *                         description: Rôle associé à l'utilisateur
 *                         example: "client"
 *       '400':
 *         description: Erreur lors de la récupération des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when recovering users"
 */
router.get("/", auth, userCtrl.getUsers);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupération d'un utilisateur.
 *     description: Retourne les informations d'un utilisateur en fonction de son identifiant, ainsi que son rôle associé.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant de l'utilisateur
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Utilisateur trouvé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: integer
 *                           description: Identifiant unique de l'utilisateur
 *                           example: 1
 *                         email:
 *                           type: string
 *                           description: Email de l'utilisateur
 *                           example: "user@example.com"
 *                         first_name:
 *                           type: string
 *                           description: Prénom de l'utilisateur
 *                           example: "John"
 *                         last_name:
 *                           type: string
 *                           description: Nom de l'utilisateur
 *                           example: "Doe"
 *                     role:
 *                       type: string
 *                       description: Rôle associé à l'utilisateur
 *                       example: "client"
 *       '404':
 *         description: Utilisateur introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       '400':
 *         description: Erreur lors de la récupération de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when recovering user"
 */
router.get("/:id", auth, userCtrl.getUserById);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Mise à jour d'un utilisateur.
 *     description: Met à jour les informations d'un utilisateur identifié par son ID et retourne les informations avec son rôle.
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant de l'utilisateur à mettre à jour
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *                 description: Nouveau prénom de l'utilisateur
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *                 description: Nouveau nom de l'utilisateur
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: Nouveau courriel de l'utilisateur
 *               role:
 *                 type: string
 *                 example: "client"
 *                 description: Nouveau rôle de l'utilisateur
 *     responses:
 *       '200':
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated"
 *                 user:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         user_id:
 *                           type: integer
 *                           description: Identifiant unique de l'utilisateur
 *                           example: 1
 *                         first_name:
 *                           type: string
 *                           description: Prénom mis à jour de l'utilisateur
 *                           example: "John"
 *                         last_name:
 *                           type: string
 *                           description: Nom mis à jour de l'utilisateur
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *                           description: Courriel mis à jour de l'utilisateur
 *                           example: "updated_user@example.com"
 *                     role:
 *                       type: string
 *                       description: Rôle de l'utilisateur
 *                       example: "client"
 *       '404':
 *         description: Utilisateur introuvable ou supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       '400':
 *         description: Erreur lors de la mise à jour de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when updating user"
 */
router.put("/:id", auth, userCtrl.updateUser);
/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Suppression d'un utilisateur.
 *     description: Supprime un utilisateur de manière logique en définissant la date de suppression (soft delete).
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant de l'utilisateur à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted"
 *                 user:
 *                   type: object
 *                   properties:
 *                     user_id:
 *                       type: integer
 *                       description: Identifiant unique de l'utilisateur
 *                       example: 1
 *                     first_name:
 *                       type: string
 *                       description: Prénom de l'utilisateur supprimé
 *                       example: "John"
 *                     last_name:
 *                       type: string
 *                       description: Nom de l'utilisateur supprimé
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       description: Courriel de l'utilisateur supprimé
 *                       example: "user@example.com"
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date de suppression logique
 *                       example: "2025-01-29T13:45:00Z"
 *       '404':
 *         description: Utilisateur introuvable ou déjà supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       '400':
 *         description: Erreur lors de la suppression de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when deleting user"
 */
router.delete("/:id", auth, userCtrl.deleteUser);

export default router;
