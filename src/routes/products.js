import express from "express";
import productCtrl from "../controllers/productController.js";
import auth from "../middlewares/authentification.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Récupérer la liste des produits
 *     description: Récupère une liste des produits avec leurs informations de vente associées si elles ne sont pas supprimées.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Liste des produits récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                         properties:
 *                           toSale_id:
 *                             type: integer
 *                             description: Identifiant de la vente liée au produit
 *                             example: 4
 *                           category:
 *                             type: string
 *                             description: Catégorie du produit
 *                             example: "Boulangerie"
 *                           brand:
 *                             type: string
 *                             description: Marque du produit
 *                             example: "La Boulangerie du Pain"
 *                           weight:
 *                             type: number
 *                             description: Poids du produit en grammes
 *                             example: 500
 *                           nb_soldBy:
 *                             type: integer
 *                             description: Nombre vendu par unité
 *                             example: 1
 *                           nb_stock:
 *                             type: integer
 *                             description: Quantité disponible en stock
 *                             example: 100
 *                           user_id_supplier:
 *                             type: integer
 *                             description: Identifiant de l'utilisateur fournisseur
 *                             example: 2
 *                       toSale:
 *                         type: object
 *                         properties:
 *                           toSale_id:
 *                             type: integer
 *                             description: Identifiant de la vente
 *                             example: 4
 *                           name:
 *                             type: string
 *                             description: Nom de la vente associée
 *                             example: "Pain Complet"
 *                           description:
 *                             type: string
 *                             description: Description de la vente
 *                             example: "Pain complet, idéal pour les sandwichs et le petit-déjeuner."
 *                           image:
 *                             type: string
 *                             description: URL de l'image du produit
 *                             example: ""
 *                           HT_price:
 *                             type: number
 *                             format: float
 *                             description: Prix hors taxe
 *                             example: 1.5
 *                           TTC_price:
 *                             type: number
 *                             format: float
 *                             description: Prix TTC
 *                             example: 1.8
 *                           margin:
 *                             type: number
 *                             format: float
 *                             description: Marge appliquée
 *                             example: 0.3
 *                           selling_price:
 *                             type: number
 *                             format: float
 *                             description: Prix de vente final
 *                             example: 2.1
 *                           deletedAt:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                             description: Date de suppression logique de la vente
 *                             example: null
 *       '400':
 *         description: Erreur lors de la récupération des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when recovering products"
 */
router.get("/", auth, productCtrl.getProducts);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Récupérer un produit spécifique
 *     description: Récupère un produit spécifique par son ID, avec ses informations de vente associées si elles ne sont pas supprimées.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID du produit à récupérer
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Produit récupéré avec succès avec ses informations de vente associées
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente liée au produit
 *                       example: 4
 *                     category:
 *                       type: string
 *                       description: Catégorie du produit
 *                       example: "Boulangerie"
 *                     brand:
 *                       type: string
 *                       description: Marque du produit
 *                       example: "La Boulangerie du Pain"
 *                     weight:
 *                       type: number
 *                       description: Poids du produit en grammes
 *                       example: 500
 *                     nb_soldBy:
 *                       type: integer
 *                       description: Nombre vendu par unité
 *                       example: 1
 *                     nb_stock:
 *                       type: integer
 *                       description: Quantité disponible en stock
 *                       example: 100
 *                     user_id_supplier:
 *                       type: integer
 *                       description: Identifiant de l'utilisateur fournisseur
 *                       example: 2
 *                 toSale:
 *                   type: object
 *                   properties:
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente
 *                       example: 4
 *                     name:
 *                       type: string
 *                       description: Nom de la vente associée
 *                       example: "Pain Complet"
 *                     description:
 *                       type: string
 *                       description: Description de la vente
 *                       example: "Pain complet, idéal pour les sandwichs et le petit-déjeuner."
 *                     image:
 *                       type: string
 *                       description: URL de l'image du produit
 *                       example: ""
 *                     HT_price:
 *                       type: number
 *                       format: float
 *                       description: Prix hors taxe
 *                       example: 1.5
 *                     TTC_price:
 *                       type: number
 *                       format: float
 *                       description: Prix TTC
 *                       example: 1.8
 *                     margin:
 *                       type: number
 *                       format: float
 *                       description: Marge appliquée
 *                       example: 0.3
 *                     selling_price:
 *                       type: number
 *                       format: float
 *                       description: Prix de vente final
 *                       example: 2.1
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: Date de suppression logique de la vente
 *                       example: null
 *       '404':
 *         description: Produit non trouvé ou déjà supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 *       '400':
 *         description: Erreur lors de la récupération du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when recovering product"
 */
router.get("/:id", auth, productCtrl.getProductById);
/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Créer un nouveau produit
 *     description: Crée un nouveau produit avec ses informations de vente associées.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du produit
 *                 example: "Pain Complet"
 *               description:
 *                 type: string
 *                 description: Description du produit
 *                 example: "Pain complet, idéal pour les sandwichs et le petit-déjeuner."
 *               image:
 *                 type: string
 *                 description: URL de l'image du produit
 *                 example: ""
 *               HT_price:
 *                 type: number
 *                 format: float
 *                 description: Prix hors taxe du produit
 *                 example: 1.5
 *               TTC_price:
 *                 type: number
 *                 format: float
 *                 description: Prix TTC du produit
 *                 example: 1.8
 *               margin:
 *                 type: number
 *                 format: float
 *                 description: Marge appliquée sur le produit
 *                 example: 0.3
 *               selling_price:
 *                 type: number
 *                 format: float
 *                 description: Prix de vente du produit
 *                 example: 2.1
 *               category:
 *                 type: string
 *                 description: Catégorie du produit
 *                 example: "Boulangerie"
 *               brand:
 *                 type: string
 *                 description: Marque du produit
 *                 example: "La Boulangerie du Pain"
 *               weight:
 *                 type: integer
 *                 description: Poids du produit en grammes
 *                 example: 500
 *               nb_soldBy:
 *                 type: integer
 *                 description: Nombre vendu par unité
 *                 example: 1
 *               nb_stock:
 *                 type: integer
 *                 description: Quantité disponible en stock
 *                 example: 100
 *               user_id_supplier:
 *                 type: integer
 *                 description: Identifiant du fournisseur du produit
 *                 example: 2
 *     responses:
 *       '201':
 *         description: Produit et vente créés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       description: Catégorie du produit
 *                       example: "Test"
 *                     brand:
 *                       type: string
 *                       description: Marque du produit
 *                       example: "Test"
 *                     weight:
 *                       type: integer
 *                       description: Poids du produit en grammes
 *                       example: 125
 *                     nb_soldBy:
 *                       type: integer
 *                       description: Nombre vendu par unité
 *                       example: 4
 *                     nb_stock:
 *                       type: integer
 *                       description: Quantité disponible en stock
 *                       example: 235
 *                     user_id_supplier:
 *                       type: integer
 *                       description: Identifiant du fournisseur du produit
 *                       example: 4
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente associée au produit
 *                       example: 57
 *                 toSale:
 *                   type: object
 *                   properties:
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente
 *                       example: 57
 *                     name:
 *                       type: string
 *                       description: Nom de la vente
 *                       example: "Test"
 *                     description:
 *                       type: string
 *                       description: Description de la vente
 *                       example: "description de test"
 *                     image:
 *                       type: string
 *                       description: URL de l'image du produit
 *                       example: null
 *                     HT_price:
 *                       type: number
 *                       format: float
 *                       description: Prix hors taxe de la vente
 *                       example: 24.99
 *                     TTC_price:
 *                       type: number
 *                       format: float
 *                       description: Prix TTC de la vente
 *                       example: 35.99
 *                     margin:
 *                       type: number
 *                       format: float
 *                       description: Marge appliquée sur la vente
 *                       example: 15
 *                     selling_price:
 *                       type: number
 *                       format: float
 *                       description: Prix de vente
 *                       example: 50.99
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date de suppression, si disponible
 *                       example: null
 *       '400':
 *         description: Erreur lors de la création du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when creating product"
 */
router.post("/", auth, productCtrl.createProduct);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Mettre à jour un produit
 *     description: Met à jour les détails d'un produit et ses informations de vente associées.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à mettre à jour
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
 *               name:
 *                 type: string
 *                 description: Nom du produit
 *                 example: "Pain Complet"
 *               description:
 *                 type: string
 *                 description: Description du produit
 *                 example: "Pain complet, idéal pour les sandwichs et le petit-déjeuner."
 *               image:
 *                 type: string
 *                 description: URL de l'image du produit
 *                 example: ""
 *               HT_price:
 *                 type: number
 *                 format: float
 *                 description: Prix hors taxe du produit
 *                 example: 1.5
 *               TTC_price:
 *                 type: number
 *                 format: float
 *                 description: Prix TTC du produit
 *                 example: 1.8
 *               margin:
 *                 type: number
 *                 format: float
 *                 description: Marge appliquée sur le produit
 *                 example: 0.3
 *               selling_price:
 *                 type: number
 *                 format: float
 *                 description: Prix de vente du produit
 *                 example: 2.1
 *               category:
 *                 type: string
 *                 description: Catégorie du produit
 *                 example: "Boulangerie"
 *               brand:
 *                 type: string
 *                 description: Marque du produit
 *                 example: "La Boulangerie du Pain"
 *               weight:
 *                 type: integer
 *                 description: Poids du produit en grammes
 *                 example: 500
 *               nb_soldBy:
 *                 type: integer
 *                 description: Nombre vendu par unité
 *                 example: 1
 *               nb_stock:
 *                 type: integer
 *                 description: Quantité disponible en stock
 *                 example: 100
 *               user_id_supplier:
 *                 type: integer
 *                 description: Identifiant du fournisseur du produit
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Produit et vente mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente associée au produit
 *                       example: 56
 *                     category:
 *                       type: string
 *                       description: Catégorie du produit
 *                       example: "Test"
 *                     brand:
 *                       type: string
 *                       description: Marque du produit
 *                       example: "Test"
 *                     weight:
 *                       type: integer
 *                       description: Poids du produit en grammes
 *                       example: 125
 *                     nb_soldBy:
 *                       type: integer
 *                       description: Nombre vendu par unité
 *                       example: 4
 *                     nb_stock:
 *                       type: integer
 *                       description: Quantité disponible en stock
 *                       example: 235
 *                     user_id_supplier:
 *                       type: integer
 *                       description: Identifiant du fournisseur du produit
 *                       example: 4
 *                 toSale:
 *                   type: object
 *                   properties:
 *                     toSale_id:
 *                       type: integer
 *                       description: Identifiant de la vente
 *                       example: 56
 *                     name:
 *                       type: string
 *                       description: Nom de la vente
 *                       example: "Test1"
 *                     description:
 *                       type: string
 *                       description: Description de la vente
 *                       example: "description de test"
 *                     image:
 *                       type: string
 *                       description: URL de l'image de la vente
 *                       example: null
 *                     HT_price:
 *                       type: number
 *                       format: float
 *                       description: Prix hors taxe de la vente
 *                       example: 24.99
 *                     TTC_price:
 *                       type: number
 *                       format: float
 *                       description: Prix TTC de la vente
 *                       example: 35.99
 *                     margin:
 *                       type: number
 *                       format: float
 *                       description: Marge appliquée sur la vente
 *                       example: 15
 *                     selling_price:
 *                       type: number
 *                       format: float
 *                       description: Prix de vente
 *                       example: 50.99
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Date de suppression, si disponible
 *                       example: null
 *       '400':
 *         description: Erreur lors de la mise à jour du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when updating product"
 *       '404':
 *         description: Produit introuvable ou déjà supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 */
router.put("/:id", auth, productCtrl.updateProduct);
/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     description: Supprime un produit en le marquant comme supprimé via le champ `deletedAt`.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du produit à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '204':
 *         description: Produit supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted"
 *       '400':
 *         description: Erreur lors de la suppression du produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error when deleting product"
 *       '404':
 *         description: Produit introuvable ou déjà supprimé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Product not found"
 */
router.delete("/:id", auth, productCtrl.deleteProduct);

export default router;
