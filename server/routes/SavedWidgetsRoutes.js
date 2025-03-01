const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Widget = require('../models/Widget');
const User = require('../models/User');

router.use(cors({
  origin: 'https://notion-bingo-widget.vercel.app',
//   origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/get-user-widgets', cors(), async (req, res) => {
  try {
    const {userId} = req.body;

    console.log("user id is :" , userId);
    console.log ("getting saved widgets");

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

    const widgets = await Widget.find({ userId: objectId }).select('title _id');

    // Map the result to get an array of titles and IDs
    const widgetData = widgets.map(widget => ({
      title: widget.title,
      id: widget._id
    }));

    res.status(200).json({
        widgets: widgetData,
        noWidgets: widgets.length === 0 //flag to indicate no widgets
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:widgetId', async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.widgetId)) {
            return res.status(400).json({ error: 'Invalid Widget ID' });
        }
        
        console.log("getting prev widget");
      // Fetch widget configuration from MongoDB based on widget ID
      const widget = await Widget.findById(req.params.widgetId);
    
      if (!widget) {
        return res.status(404).json({ error: 'Widget not found' });
      }
      console.log("squareBackgrounds in response:", widget.squareBackgrounds);
      
      res.send(widget);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.put('/update', async (req, res) => {

    try {
        console.log("reached saved widget update");
        
        const { widgetId, backgroundColor, textColor, outlineColor, titleColor, squareInputs, squareBackgrounds, titleToggle, title, userId, gridSize, bingoToggle} = req.body;
        console.log("widget id is:", widgetId);


        if (!mongoose.Types.ObjectId.isValid(widgetId)) {
            return res.status(400).json({ error: 'Invalid Widget ID format' });
        }

        const widgetObjectId = new mongoose.Types.ObjectId(widgetId);
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // check if widget exists
        const existingWidget = await Widget.findById(widgetObjectId);
        if (!existingWidget) {
            return res.status(400).json({ error: 'Invalid Widget ID' });
        }

         // verify the widget belongs to the user
        if (!existingWidget.userId.equals(userObjectId)) {
            return res.status(403).json({ error: 'Unauthorized: User ID does not match the widget owner' });
        }

        //update widget data
        existingWidget.backgroundColor = backgroundColor;
        existingWidget.textColor = textColor;
        existingWidget.outlineColor = outlineColor;
        existingWidget.titleColor = titleColor;
        existingWidget.squareInputs = squareInputs;
        existingWidget.titleToggle = titleToggle;
        existingWidget.title = title;
        existingWidget.gridSize = gridSize;
        existingWidget.squareBackgrounds = squareBackgrounds;
        existingWidget.bingoToggle = bingoToggle;
        await existingWidget.save();

        res.sendStatus(200);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
