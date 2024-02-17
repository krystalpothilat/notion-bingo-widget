const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const handlebars = require('handlebars');
const app = express();
const port = process.env.PORT || 8080;
const path = require('path');

// Middleware
app.use(cors({
  origin: 'https://notion-bingo-widget.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const widgetCustomizationRoutes = require('./routes/WidgetCustomization');
const widgetRenderRoutes = require('./routes/WidgetRender');

app.use('/WidgetCustomization', widgetCustomizationRoutes);
app.use('/', widgetRenderRoutes);

// app.get('*', (req, res) => {
//   console.log('Catch-All Route:', req.originalUrl);
//   res.sendFile(path.join(__dirname, '../../public/index.html'));
// });

// app.get('*', (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, '../../public/index.html'));
//   } catch (error) {
//     console.error('Error sending file:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
