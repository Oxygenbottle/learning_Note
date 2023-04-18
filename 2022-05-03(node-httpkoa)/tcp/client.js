const net = require('net');

const hostName = "127.0.0.1"
const port = "9002"

const client = new net.Socket();
const url = [hostName, port].join(':')

let count = 0;

client.connect(port, hostName, () => {
  console.log(`客户端已经成功连接到 ${url}`)

  const timer = setInterval(() => {
    if (count > 10) {
      client.write('我发完了')
      clearInterval(timer);
      return;
    }
    client.write(`这是我第${count++}发数据`)
  }, 1000)
})

client.on('data', (data)=>{
  console.log(`收到数据: ${data}`)
})

client.on('close', ()=>{
  console.log('客户端关闭连接')
})