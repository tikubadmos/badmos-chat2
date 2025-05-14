const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html on root
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

// Create an HTTP server and attach Socket.io
const server = http.createServer(app);
const io = require('socket.io')(server);

// Listen for socket connections
io.on('connection', socket => {
  console.log('🟢 New client connected');

  // Relay incoming messages to all clients
  socket.on('chat message', msg => {
    console.log('🔵 Message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Client disconnected');
  });
});

// Start the server (replace app.listen)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
