const express = require('express');
const router = express.Router();
const cors = require('cors');
const Widget = require('../models/Widget');

router.use(cors({
  origin: 'http://notion-bingo-widget-server.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/save', cors(), async (req, res) => {
  try {
    console.log("reached save");
    // Extract widget customization data from request body
    const {backgroundColor, textColor, outlineColor, titleColor, squareInputs, titleToggle, title} = req.body;

    // Create a new widget document
    const newWidget = new Widget({
      backgroundColor,
      textColor,
      outlineColor,
      titleColor,
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
