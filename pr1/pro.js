const server = require('net').createServer()

server.on('connection', (socket) =>{
    socket.write('Welcome new client')
    console.log('new client connected on', socket.remoteAddress)
    server.getConnections((err, count) =>{
        console.log('Number of connections is :', count)
    })
    socket.setTimeout(10000);
    socket.on('timeout', () => {
        console.log(' The connetion has been terminated! ');
        socket.end()
    })
   socket.on('data', (data) => {
    console.log('The Client Message is ', data)
   })
   socket.setEncoding('utf8')
   socket.on('end', () => {
    console.log('Client disconnected')
   })
})
server.on('error', (err) => {
    server.close()
})

server.on('error', (err) => {
    if(err.code == 'EADDRINUSE'){
        console.log('Server in use .......... retrying.......')

        setTimeout(() => {
            server.listen(5500, () => {
                console.log('Problem solved')
            })
        },5500)
    }
})

server.listen(3000, ()=> {
    console.log('server is running')
})
console.log(server.listening)