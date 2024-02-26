const app = require('express')();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;

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
const widgetCustomizationRoutes = require('./WidgetCustomization');
const widgetRenderRoutes = require('./WidgetRender');

app.options('/WidgetCustomization/save', cors());

app.use('/WidgetCustomization', widgetCustomizationRoutes);
app.use('/', widgetRenderRoutes);

module.exports = app;