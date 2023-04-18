const net = require('net');

const hostName = "127.0.0.1"
const port = "9002"

net.createServer((socket)=>{
  const url = [hostName, port].join(':')
  console.log(`${hostName} 已经连接成功!`)

  socket.on('data', data =>{
    console.log(`${url} 收到数据： ${data}`)
    socket.write(`服务端已经收到了数据： ${data}`)
  })

  socket.on('close', (data)=> {
    console.log(`${url} 正在关闭`)
  })
}).listen(port, hostName)

console.log(`Server is lissting on ${port}}`)