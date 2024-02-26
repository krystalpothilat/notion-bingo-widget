const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
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
mongoose.connect('mongodb+srv://notion-bingo-widget.o18sfbl.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Notion-Bingo-Widget', auth: { username: 'krystalpothilat', password: 'Dftqn1KodwdEHFLy'}, });
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
