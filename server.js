
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const fs = require('fs');
const cors = require('cors')

// parse application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.options('*', cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const dataFileName = 'data.json';

// Loads redux state from data stored on disk.
app.get('/load', function(req, res) {
  fs.readFile(dataFileName, 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        fs.open(dataFileName, 'w', function (err, fd) {
          if (err) throw err;
          console.log('File created!');
          fs.close(fd, (err) => {
            if (err) throw err;
          });
          res.send();
        }); 
      } else {
        throw err;
      }
    }
    res.send(JSON.stringify(data));
  })
});

// Store redux state on disk
app.post('/save', function(req, res) {
  console.log(req);
  fs.writeFile(dataFileName, JSON.stringify(req.body), (err) => {
    if (err) throw err;
    res.send(JSON.stringify(req.body));
  });
});

app.listen(process.env.PORT || 8080);