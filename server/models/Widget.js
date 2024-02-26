const mongoose = require('mongoose');
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
  titleToggle: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    // required: true,
  },
});


const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
