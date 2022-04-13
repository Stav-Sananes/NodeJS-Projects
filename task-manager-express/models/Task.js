const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters '],
  },
  compeleted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('Task', TaskSchema);
