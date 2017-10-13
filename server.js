
const { app_port, socket_port } = require('./config');

const io = require('socket.io')(socket_port);
const fs = require('fs');
const path = require('path');
const twitter = require('./twitter');

const trackings = ['Lv 75', 'Lvl 75', 'Celeste Omega'];
const sockets = [];

io.on('connection', function (socket) {
  socket.emit('init', { hello: 'world' });
  sockets.push(socket);
});
trackings.forEach((track) => {
  twitter.stream('statuses/filter', { track }, (stream) => {
    stream.on('error', console.error);
    stream.on('data', (event) => {
      const tweet = { tweet: event.text };
      console.log(event.text);
      sockets.forEach(socket => socket.volatile.emit('tweet', tweet));
    });
  });
});

require('http').createServer(handler).listen(app_port);
function handler (req, res) {
  const file = path.resolve(__dirname + (req.url === '/' ? '/index.html' : req.url));
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.writeHead(500);
      return res.end(err.toString());
    }
    res.writeHead(200);
    res.end(data);
  });
}


