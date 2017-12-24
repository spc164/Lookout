const express = require('express');
const socketIO = require('socket.io');

module.exports = () => {
  // hellow world server, listening on 3001
  const PORT = 3001;

  const server = express()
    .use(express.static(__dirname + '/public1'))
    .use('/node_modules', express.static(__dirname + '/node_modules'))
    // prevent error message on reloads as per https://stackoverflow.com/a/35284602
    .get('/*', function(req, res){
      res.sendFile(__dirname + '/public1/index.html');
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  const io = socketIO(server);
  io.on('connection', (socket) => {
    console.log('Client connected');
    socket.on('disconnect', () => console.log('Client disconnected'));
  });

  let count = 0;
  setInterval(() => {
    io.emit('count', count++);
  }, 1000);
};
