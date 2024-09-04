const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const cors = require('cors');
const Widget = require('../models/Widget');
const User = require('../models/User');

router.use(cors({
//   origin: 'https://notion-bingo-widget-server.vercel.app',
  origin: '*',
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

module.exports = router;
