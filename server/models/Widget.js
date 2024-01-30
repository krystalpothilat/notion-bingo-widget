const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const arrayLengthValidator = (val) => val.length === 9;

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
  squareInputs: {
    type: [
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
    validate: {
      validator: arrayLengthValidator,
      message: '{PATH} must have exactly 9 elements',
    },
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});


const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
