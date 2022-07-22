const { Socket } = require('socket.io')

const app = require('express')()
const httpServer = require('http').createServer(app)
const io = require('socket.io')(httpServer)

app.get('/', (req, res) => {
     res.sendfile('index.html')
})

app.get('/admin', (req, res) => {
     res.sendfile('admin.html')
})

io.on('connection', (socket) => {
     console.log("User : " + socket.id)

     socket.on('messageSent', (message) => {
          socket.broadcast.emit('messageSent', message)
     })
})

httpServer.listen(3000, ()=>{
     console.log("Server running at port 3000...")
})