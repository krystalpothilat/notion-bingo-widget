const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  title: String,
  backgroundColor: String,
  textColor: String,
  squareInputs: [{ type: String }], // Adjust the type based on your square input requirements
});

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
