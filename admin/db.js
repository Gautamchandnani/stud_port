// admin/models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  adminName: String,
  adminEmail: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Admin', adminSchema);
