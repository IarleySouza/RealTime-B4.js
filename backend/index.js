const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const path = require("path");

app.get('/', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, "../frontend/index.html"));
});

io.on('connection', (socket) => {
    console.log('Algume se conectou com o id' + socket.id)
})

function geraValor() {
    return (Math.random() * 100).toFixed(2)
}

setInterval( () => {
    io.emit('cotação', geraValor())
}, 1000)

server.listen(3000, () => {
    console.log("Ouvindo na porta 3000")
});