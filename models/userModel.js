const mongoose = require('mongoose');

const puserSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const pUser = mongoose.model('pUser', puserSchema);

module.exports = pUser;
