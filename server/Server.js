const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/notion-bingo-widget', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const widgetCustomizationRoutes = require('./routes/widgetCustomization');
const widgetRenderRoutes = require('./routes/widgetRender');

app.use('/api/widgetCustomization', widgetCustomizationRoutes);
app.use('/api/widgetRender', widgetRenderRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
