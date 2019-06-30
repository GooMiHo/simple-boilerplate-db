const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db = require('./db');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routes
app.use('/api', require('./apiRoutes'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.sync()
  .then(function(){
    app.listen(port, function() {
      console.log(`Listening on port ${port}`);
    });
  });
