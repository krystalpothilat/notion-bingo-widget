const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

// Middleware
// app.use(cors({
//   origin: 'https://notion-bingo-widget.vercel.app/',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// }));
app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Notion-Bingo-Widget'});

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

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
