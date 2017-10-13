
/* globals io */

const socket = io('http://localhost');
console.log('potato');
socket.on('news', function (data) {
  console.log(data);
  socket.emit('my other event', { my: 'data' });
});