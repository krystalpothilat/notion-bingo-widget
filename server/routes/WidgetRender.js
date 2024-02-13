const express = require('express');
const router = express.Router();
const Widget = require('../models/Widget');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const allowPrototypeAccess = require('@handlebars/allow-prototype-access');
// const allowPrototypeAccess = require('@handlebars/allow-prototype-access').allowPrototypeAccess;

// const handlebars = require('handlebars');
// const { allowPrototypeAccess } = require('@handlebars/allow-prototype-access');

// allowPrototypeAccess(handlebars);

if (handlebars.SafeString) {
  handlebars.SafeString.prototype.allowProtoAccess = true;
} else {
  console.warn("Handlebars version does not support allowPrototypeAccess.");
}

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
  const html = `
    <div class="bingocard" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
      <h2 id="title" style="color: ${data.titleColor}; visibility: ${data.titleToggle ? 'visible' : 'hidden'};">
        ${data.title}
      </h2>

      <div class="squares">
        ${data.squareInputs.map((input, index) => `
          <div class="square" id="square-${index}" style="background-color: ${data.backgroundColor}; color: ${data.textColor}; border: 1px solid ${data.outlineColor};" onclick="handleBoxClick(${index})">
            <div class="text" style="pointer-events: none;">${input.text}</div>
          </div>
        `).join('')}
      </div>
    </div>

  `;

  console.log(html);
  console.log("html done");
  return html;
}


module.exports = router;
