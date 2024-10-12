// controller.js for clients
const Client = require('../../models/client/client.model');

const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (token) {
      jwt.verify(token, '2fe3ce2f', (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      res.sendStatus(401);
  }
};

// Get worker data by userId
const getMyData = async (req, res) => {
  try {
      // Find worker by userId from the JWT
      const client = await Client.findOne({ userId: req.user.userId })
      .populate('userId')
      .populate({
        path: 'favorites', // This will populate the favorites field
        populate: { path: 'userId', select: 'name profilePic rating' } // This populates the userId in the Worker document
      });
      if (!client) return res.status(404).json({ message: 'Worker not found' });

      res.status(200).json(client);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching worker data', error });
  }
};

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('userId');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// Get a single client by ID
const getClientById = async (req, res) => {
  try {
    // Populate the userId field with the user's name and other attributes you want
    const client = await Client.findById(req.params.id).populate({
      path: 'userId', 
      select: 'name email profilePic rating', // Only select the fields you need from the user
    });
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client', error });
  }
};


// Create a new client
const createClient = async (req, res) => {
  const newClient = new Client(req.body);
  try {
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: 'Error creating client', error });
  }
};

// Update a client by ID
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedClient) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: 'Error updating client', error });
  }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};

// Add this function in your controller.js
const addOrRemoveFavouriteWorker = async (req, res) => {
  const { workerId } = req.body; // assuming workerId is passed in the request body
  try {
    const client = await Client.findOne({ userId: req.user.userId });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Check if the workerId is already in favorites
    const index = client.favorites.indexOf(workerId);

    if (index !== -1) {
      // Worker is already a favorite, remove it
      client.favorites.splice(index, 1);
    } else {
      // Worker is not a favorite, add it
      client.favorites.push(workerId);
    }

    // Save the updated client
    await client.save();

    res.status(200).json({ message: 'Favorites updated', favorites: client.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Error updating favorites', error });
  }
};

module.exports = {
  getMyData,
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  authenticateJWT,
  addOrRemoveFavouriteWorker
};
