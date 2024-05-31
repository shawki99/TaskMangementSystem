const mongoose = require('mongoose');

const statusEnumSchema = new mongoose.Schema({
  _id: Number,
  status: {
    type: String,
    required: true
  }
});

const StatusEnum = mongoose.model('StatusEnum', statusEnumSchema);
module.exports = StatusEnum;
