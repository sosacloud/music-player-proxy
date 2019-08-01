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
  const url = `http://ec2-13-56-150-152.us-west-1.compute.amazonaws.com/api/songs/${
    req.params.id
  }`;
  request(url).pipe(res);
});

// comments-service: get comments
app.use('/comments/init', (req, res) => {
  const url = `http://localhost:3001/comments/init`;
  request(url).pipe(res);
});

// comments-service: post comments
app.use('/comments/new', (req, res) => {
  const url = `http://localhost:3001/comments/new`;
  request(url).pipe(res);
});

// sidebar-service: tracks
app.use('/api/track/:id', (req, res) => {
  const url = `http://relatedtracks-env2.hjpjmvifc3.us-west-2.elasticbeanstalk.com/api/track/${
    req.params.id
  }`;
  request(url).pipe(res);
});

// sidebar-service: users
app.use('/api/user/:user_name', (req, res) => {
  const url = `http://relatedtracks-env2.hjpjmvifc3.us-west-2.elasticbeanstalk.com/api/user/${
    req.params.user_name
  }`;
  request(url).pipe(res);
});

// sidebar-service: playlists
app.use('/api/playlists/:track_id', (req, res) => {
  const url = `http://relatedtracks-env2.hjpjmvifc3.us-west-2.elasticbeanstalk.com/api/playlists/${
    req.params.track_id
  }`;
  request(url).pipe(res);
});

// sidebar-service: likes
app.use('/api/track/likes/:track_id', (req, res) => {
  const url = `http://relatedtracks-env2.hjpjmvifc3.us-west-2.elasticbeanstalk.com/api/track/likes/${
    req.params.track_id
  }`;
  request(url).pipe(res);
});

// sidebar-service: reposts
app.use('/api/track/reposts/:track_id', (req, res) => {
  const url = `http://relatedtracks-env2.hjpjmvifc3.us-west-2.elasticbeanstalk.com/api/track/reposts/${
    req.params.track_id
  }`;
  request(url).pipe(res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`music-player-proxy is listening on ${PORT}`);
});
