const http = require('http')


const hostName = "127.0.0.1"
const port = "9002"

http.createServer(function(req, res) {
  res.writeHeat(200, {
    'Content-Type': 'text/plain'
  });
  res.end("Hello Http")
}).listen(port, hostName)
console.log(`http server is listening on ${port}`)