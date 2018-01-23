/*eslint-disable*/
var WebSocketServer = require('ws').Server
var express = require('express')
var path = require('path')
var app = express()
var server = require('http').createServer()

app.use(express.static(path.join(__dirname, '/public')))

var wss = new WebSocketServer({server: server})
wss.on('connection', function (ws) {
  var id = setInterval(function () {
    ws.send(JSON.stringify(process.memoryUsage()), function () { /* ignore errors */ })
  }, 500)
  console.log('started client interval')
  ws.on('close', function () {
    console.log('stopping client interval')
    clearInterval(id)
  })
})

server.on('request', app)
server.listen(3000, function () {
  console.log('Listening on http://localhost:3000')
})
