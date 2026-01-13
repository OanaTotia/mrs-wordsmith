import { Router } from "express";
import {
  createAccount,
  getAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount,
} from "./account.store.js";

export const accountRouter = Router();

/**
 * @openapi
 * /accounts:
 *   post:
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 */
accountRouter.post("/", (req, res) => {
  const account = createAccount(req.body);
  res.status(201).json(account);
});

/**
 * @openapi
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     responses:
 *       200:
 *         description: List of accounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
accountRouter.get("/", (_req, res) => {
  res.json(getAllAccounts());
});

/**
 * @openapi
 * /accounts/{id}:
 *   get:
 *     summary: Get an account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
accountRouter.get("/:id", (req, res) => {
  const account = getAccount(req.params.id);
  if (!account) return res.status(404).json({ message: "Account not found" });
  res.json(account);
});

/**
 * @openapi
 * /accounts/{id}:
 *   put:
 *     summary: Update an account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated account
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 */
accountRouter.put("/:id", (req, res) => {
  const updated = updateAccount(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Account not found" });
  res.json(updated);
});

/**
 * @openapi
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Account deleted
 *       404:
 *         description: Account not found
 */
accountRouter.delete("/:id", (req, res) => {
  const success = deleteAccount(req.params.id);
  if (!success) return res.status(404).json({ message: "Account not found" });
  res.status(204).send();
});

import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Account Management API",
      version: "1.0.0",
      description: "Simple REST API for managing accounts",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Account: {
          type: "object",
          properties: {
            id: { type: "string" },
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["id", "name", "email", "createdAt"],
        },
      },
    },
  },
  apis: ["./src/**/*.ts"],
});
