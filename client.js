
const socket = io('http://localhost:8080');
socket.on('init', function (data) {
  console.log(data);
});

socket.on('tweet', (data) => {
  console.log(data);
});
