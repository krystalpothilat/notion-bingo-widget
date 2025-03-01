const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

app.use(express.static('public'));

// Remove COOP and CORP headers
app.use((req, res, next) => {
    // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    res.cookie('cookieName', 'cookieValue', {
        sameSite: 'None', 
        secure: true // Ensure HTTPS is used
    });
    
    next();
});


// Middleware
app.use(cors({
//   origin: 'https://notion-bingo-widget.vercel.app',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// app.use(cors());
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
const widgetCustomizationRoute = require('./routes/WidgetCustomization.js');
const widgetRenderRoute = require('./routes/WidgetRender.js');
const userRoutes = require('./routes/UserRoutes.js');
const savedWidgets = require('./routes/SavedWidgetsRoutes.js');

app.use('/WidgetCustomization', widgetCustomizationRoute);
app.use('/', widgetRenderRoute);
app.use('/user', userRoutes);
app.use('/saved', savedWidgets);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
