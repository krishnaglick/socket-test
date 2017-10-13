
const app = require('http').createServer(handler);
const io = require('socket.io')(app);
const fs = require('fs');
const path = require('path');

app.listen(80);

function handler (req, res) {
  //console.log(Object.keys(req));
  const file = path.resolve(__dirname + (req.url === '/' ? '/index.html' : req.url));
  console.log(file);
  fs.readFile(file, (err, data) => {
    if (err) {
      console.error(err);
      res.writeHead(500);
      return res.end(err);
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
