const mongoose = require('mongoose');
const arrayLengthValidator = (val) => [9, 16, 25].includes(val.length);


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
      message: '{PATH} must have exactly 9, 16, or 25 elements',
    },
    required: true,
  },
  titleToggle: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
  },
  gridSize: {
    type: Number,
    required: true, 
  },
  squareBackgrounds: { 
    type: [Boolean],
    required: true,
    validate: {
      validator: function(val) {
        return val.length === this.gridSize * this.gridSize; 
      },
      message: 'The square state array must have the same number of elements as gridSize * gridSize',
    },
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  }
});


const Widget = mongoose.model('Widget', widgetSchema);

module.exports = Widget;
