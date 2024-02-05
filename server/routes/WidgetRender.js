const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const allowPrototypeAccess = require('@handlebars/allow-prototype-access');

allowPrototypeAccess(handlebars);

router.get('/:widgetId', async (req, res) => {
  try {

    console.log("widgetrender.js get");

    // Fetch widget configuration from MongoDB based on widget ID
    const widget = await Widget.findById(req.params.widgetId);
    console.log(widget);

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

function getHtml(data) {
  console.log("getHtml");
  // Adjust the path based on your project structure
  const templateSource = fs.readFileSync(path.join(__dirname, '../../public/WidgetTemplate.handlebars'), 'utf-8');  


  // Compile the template with runtime options
  const template = handlebars.compile(templateSource, { noEscape: true });

  // Fill the template with data
  const filledTemplate = template(data);

  console.log(filledTemplate);

  return filledTemplate;
}


module.exports = router;
