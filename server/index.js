const express = require('express');
const {v4: uuid} = require('uuid');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// setup a rooms array
// I will move to a mongodb database but this is for easy prototyping
let rooms = [];

// a route that will show that the server is running
app.get('/', (_, res) => res.send('server running'));

// a connection handler for when a user connects to the server
io.on('connection', socket => {
  // console.log() when the user joins
  console.log('new user connected');
  // setup a use object that will contain the user state
  let user = {
    name: 'SnakeBoi',
    roomId: null,
  };

  // when a user wants to change their name they can emit an event
  socket.on('change name', name => {
    user.name = name;
  });

  // when a user creates a new room generate a new room object and push it to the room array
  // when mongodb database is added I will add the room to the db
  socket.on('new room', () => {
    room = {
      id: uuid(),
      players: [user.name],
    };
    console.log('creating a new room, room id is: ', room.id);
    rooms.push(room);
    socket.join(room.id);
    socket.emit('roomid', room.id);
    user.roomId = room.id;
  });

  // web socket event for when a user wants to join a room
  socket.on('join room', roomId => {
    // find a room index where the room id is equal to the requested roomid
    const roomIndex = rooms.findIndex(i => {
      if (i.id === roomId) return true;
      else return false;
    });
    // if the room doesn't exist do nothing
    if (!roomIndex && roomIndex !== 0) return;
    // add the user to the room object and join the websocket to the room
    rooms[roomIndex].players.push(user.name);
    console.log(`${user.name} is joining game: ${roomId}`);
    socket.to(roomIndex).emit('new player', user.name);
    socket.join(roomId);
    socket.emit('roomid', rooms[roomIndex].id);

    if (rooms[roomIndex].players.length === 2) {
      socket.to(roomId).emit('start count');
      setTimeout(() => {
        socket.to(roomId).emit('gamestart');
      }, 3000)
    }
  });

  socket.on('player move', ({coords}) => {
    socket.to(user.roomId).emit('player move', {coords});
  });
});

// start the server
http.listen(process.env.PORT || 4000, () => {
  console.log('listening on port 4000');
});

