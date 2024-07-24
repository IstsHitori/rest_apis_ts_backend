import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { param } from "express-validator";
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *       type: object
 *       properties:
 *          id:
 *              type: integer
 *              description: The Product ID
 *              example: 1
 *
 *          name:
 *              type: string
 *              description: The Product names
 *              example: Monitor curvo de 49 pulgadas
 *          price:
 *              type: number
 *              description: The Product price
 *              example: 300
 *
 *          availability:
 *              type: boolean
 *              description: The Product availability
 *              example: true
 *
 */

/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *
 */

/**
 * @swagger
 * /products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Succesful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *        404:
 *          description: Not found
 *        400:
 *          description: bad Request - Invalid ID
 *
 */

/**
 * @swagger
 * /products:
 *    post:
 *      summary: Creates a new product
 *      tags:
 *        - Products
 *      description: Return a new record in the DB
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: 'Monitor curvo 49 pulgadas'
 *                price:
 *                  type: number
 *                  example: 3.99
 *      responses:
 *      201:
 *        description: Succesfully response
 *        content:
 *          application/json:
 *            schema:
 *               $ref: "#/components/schemas/Product"
 *        400:
 *          description: Bad Request - Invalid input data
 */

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated Product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        requred: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Monitor Curvo 49 pulgadas"
 *              price:
 *                type: number
 *                example: 3.99
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Succesfully response
 *        content:
 *          application/json:
 *            schema:
 *               $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request -  Invalid ID or invalid
 *      404:
 *        description: Product not found
 */

/**
 * @swagger
 * /products/{id}:
 *  patch:
 *    summary: JUpdate Product availability
 *    tags:
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        requred: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Succesfully response
 *        content:
 *          application/json:
 *            schema:
 *               $ref: "#/components/schemas/Product"
 *      400:
 *        description: Bad request -  Invalid ID or invalid
 *      404:
 *        description: Product not found
 */

/**
 * @swagger
 *  /products/{id}:
 *    delete:
 *      summary: Deletes a product by ID
 *      tags:
 *        - Products
 *      description: Returns a confirmation message
 *      parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        200:
 *          description: Succesfully response
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                value: "Producto eliminado"
 *
 */
router.get("/", getProducts);
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  getProductById
);

router.post("/", handleInputErrors, createProduct);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  updateProduct
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  updateAvailability
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  deleteProduct
);

export default router;
