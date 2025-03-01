const express = require('express');
const router = express.Router();
const cors = require('cors');
const Widget = require('../models/Widget');

router.use(cors({
  origin: 'https://notion-bingo-widget.vercel.app',
//   origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.get('/:widgetId', async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.widgetId)) {
            return res.status(400).json({ error: 'Invalid Widget ID' });
        }
        
        console.log("getting prev widget");
      // Fetch widget configuration from MongoDB based on widget ID
      const widget = await Widget.findById(req.params.widgetId);
      console.log(widget);
    
      if (!widget) {
        return res.status(404).json({ error: 'Widget not found' });
      }
  
      res.send(widget);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get('/', (req, res) => {
    res.send('Server is running');
  });
  



module.exports = router;
