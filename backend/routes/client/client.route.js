// route.js for clients
const express = require("express");
const {
  getMyData,
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  authenticateJWT,
  addOrRemoveFavouriteWorker
} = require("../../controllers/client/client.controller");

const router = express.Router();

// Route to get my data
router.get("/mydata", authenticateJWT, getMyData);

// Route to get all clients
router.get("/", getAllClients);

// Route to get a single client by ID
router.get("/:id", getClientById);

// Route to create a new client
router.post("/create", createClient);

// Route to update a client by ID
router.put("/update/:id", updateClient);

// Route to delete a client by ID
router.delete("/delete/:id", deleteClient);

// Route to toggle favorite workers
router.post("/favorite", authenticateJWT, addOrRemoveFavouriteWorker);

module.exports = router;
