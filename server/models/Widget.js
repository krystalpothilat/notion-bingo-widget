const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const widgetSchema = new mongoose.Schema({
  backgroundColor: {
    type: String,
    required: true,
  },

  textColor: {
    type: String,
    required: true,
  },
  outlineColor: {
    type: String,
    required: true,
  },
  titleColor: {
    type: String,
    required: true,
  },
  widgetId: {
    type: String,
    default: uuidv4(),
    unique: true,
  },
  squareInputs: [
    {
      index: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  validate: [arrayLengthValidator, '{PATH} must have exactly 9 elements'],
  title: {
    type: String,
    required: true,
  },
});

function arrayLengthValidator(value) {
  return value.length === 9;
}

const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
