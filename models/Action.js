const { Schema, model } = require('mongoose');

/* Describe user's schema of the collection */
const schema = new Schema({
  number: {
    type: Number
  }
}, { collection: 'actions' });

module.exports = model('Action', schema);
