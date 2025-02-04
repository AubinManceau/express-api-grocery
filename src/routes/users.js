import express from "express";
import userCtrl from "../controllers/userController.js";
import auth from "../middlewares/authentification.js";

const router = express.Router();

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
 *       '500':
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
 *       '500':
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
 * /api/v1/users/{role}:
 *   get:
 *     summary: Récupération des utilisateurs par rôle.
 *     description: Récupère une liste d'utilisateurs selon leur rôle (client, admin, commercial, supplier, deliveryMan, logisticManager).
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *         description: Le rôle des utilisateurs à récupérer
 *         schema:
 *           type: string
 *           enum: [client, admin, commercial, supplier, deliveryMan, logisticManager]
 *           example: client
 *     responses:
 *       '200':
 *         description: Liste des utilisateurs correspondant au rôle spécifié
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clients:
 *                   type: array
 *                   description: Liste des utilisateurs pour le rôle 'client'
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         description: ID de l'utilisateur
 *                         example: 20
 *                       first_name:
 *                         type: string
 *                         description: Prénom de l'utilisateur
 *                         example: "Paul"
 *                       last_name:
 *                         type: string
 *                         description: Nom de l'utilisateur
 *                         example: "Girard"
 *                       email:
 *                         type: string
 *                         description: Email de l'utilisateur
 *                         example: "paul.girard@exemple.fr"
 *                       password:
 *                         type: string
 *                         description: Mot de passe hashé de l'utilisateur
 *                         example: "MotDePasse123"
 *                       deletedAt:
 *                         type: string
 *                         description: Date de suppression de l'utilisateur
 *                         example: null
 *       '500':
 *         description: Rôle non trouvé ou erreur lors de la récupération
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
 *       '404':
 *         description: Rôle non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role not found"
 */
router.get("/role/:role", auth, userCtrl.getUsersByRole);
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
 *       '500':
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
 *       '500':
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
