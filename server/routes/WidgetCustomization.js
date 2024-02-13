const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');
const { v4: uuidv4 } = require('uuid');

router.post('/save', async (req, res) => {
  try {
    console.log("reached save");
    // Extract widget customization data from request body
    const {backgroundColor, textColor, outlineColor, titleColor, squareInputs, titleToggle, title} = req.body;

    const widgetId = uuidv4();

    // Create a new widget document
    const newWidget = new Widget({
      backgroundColor,
      textColor,
      outlineColor,
      titleColor,
      widgetId,
      squareInputs,
      titleToggle,
      title,
    });
    
    // Save the widget to the database
    const savedWidget = await newWidget.save();
    console.log ("saved widget id is " + savedWidget._id.toString());

    // Respond with the saved widget ID
    res.json({ widgetId: savedWidget._id.toString() });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
