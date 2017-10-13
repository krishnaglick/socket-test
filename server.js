
const io = require('socket.io')(8080);
const fs = require('fs');
const path = require('path');

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

require('http').createServer(handler).listen(80);
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


