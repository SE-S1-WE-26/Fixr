// controller.js for clients
const Client = require('../../models/client/client.model');

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().populate('publishedJobs');
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

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
