const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');

router.get('/:widgetId', async (req, res) => {
  try {
    // Fetch widget configuration from MongoDB based on widget ID
    const widget = await Widget.findById(req.params.widgetId);

    if (!widget) {
      return res.status(404).json({ error: 'Widget not found' });
    }

    // Generate HTML for rendering the widget based on the retrieved configuration
    const widgetHtml = getHtml(widget);

    // Send the HTML back to the client
    res.send(widgetHtml);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
