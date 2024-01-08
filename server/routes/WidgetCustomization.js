const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');

router.post('/save', async (req, res) => {
  try {
    // Extract widget customization data from request body
    const { title, backgroundColor, textColor, squareInputs } = req.body;

    // Create a new widget document
    const newWidget = new Widget({
      title,
      backgroundColor,
      textColor,
      squareInputs,
    });

    // Save the widget to the database
    const savedWidget = await newWidget.save();

    // Respond with the saved widget ID
    res.json({ widgetId: savedWidget._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
