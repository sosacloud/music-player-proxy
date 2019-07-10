const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, '../dist')));

// music-player-service
app.use('/api/songs/:id', (req, res) => {
  const url = `http://localhost:3003/api/songs/${req.params.id}`;
  req.pipe(request(url)).pipe(res);
});

// // comments-service
// app.use('/api/songs/:id', (req, res) => {
//   const url = `http://localhost:3001/???/${req.params.id}`;
//   req.pipe(request(url)).pipe(res);
// });

// // sidebar-service
// app.use('/api/songs/:id', (req, res) => {
//   // console.log('THIS IS ID', req.params.id);
//   const url = `http://localhost:3002/???/${req.params.id}`;
//   req.pipe(request(url)).pipe(res);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`music-player-proxy is listening on ${PORT}`);
});