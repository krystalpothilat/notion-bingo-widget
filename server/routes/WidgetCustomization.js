const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Widget = require('../models/Widget');
const User = require('../models/User');

router.use(cors({
//   origin: 'https://notion-bingo-widget.vercel.app',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/save', cors(), async (req, res) => {
  try {
    console.log("reached save");
    // extract widget customization data from request body
    const {backgroundColor, textColor, outlineColor, titleColor, squareInputs, titleToggle, squareBackgrounds, gridSize, title, userId, bingoToggle,} = req.body;
    console.log("user id is :" , userId);

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid User ID format' });
    }

    // Convert userId to ObjectId
    const objectId = new mongoose.Types.ObjectId(userId);

    // Check if user exists
    const existingUser = await User.findById(objectId);
    if (!existingUser) {
    return res.status(400).json({ error: 'Invalid User ID' });
    }
    console.log("checked user");

    const newWidget = new Widget({
      backgroundColor,
      textColor,
      outlineColor,
      titleColor,
      squareInputs,
      squareBackgrounds,
      titleToggle,
      title,
      gridSize,
      userId: objectId, 
      bingoToggle,
    });
    
    console.log("created new widget");

    // save widget
    const savedWidget = await newWidget.save();
    console.log ("saved widget id is " + savedWidget._id.toString());

    // return saved widget ID
    res.json({ widgetId: savedWidget._id.toString() });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
