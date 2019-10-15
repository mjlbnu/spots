const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./src/routes');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect(
  'mongodb+srv://mjlbnu:AjYGBMVBw9hQ3PHv@omnistack9-4agvr.mongodb.net/semana09?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, 'uploads')));
app.use(routes);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(process.env.PORT || 3333, function() {
  console.log('Server is running');
});
