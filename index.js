var app = require('express')();
// var http = require('http').Server(app);
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("a user connected!!");
  socket.on('disconnect', function(){
    console.log(" user disconnected!!");
  })
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.emit('some event', {for: 'everyone'});

io.on('connection', function(socket){
  // socket.broadcast.emit('hi');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  })
})

