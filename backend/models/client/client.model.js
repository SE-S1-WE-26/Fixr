const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  },
  favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Worker',
  }],
});


const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
