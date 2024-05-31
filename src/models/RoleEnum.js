const mongoose = require('mongoose');

const roleEnumSchema = new mongoose.Schema({
  _id: Number,
  roleName: {
    type: String,
    required: true
  }
});

const RoleEnum = mongoose.model('RoleEnum', roleEnumSchema);
module.exports = RoleEnum;
