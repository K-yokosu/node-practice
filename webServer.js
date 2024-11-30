const net = require('net')
const fs = require('fs')

const PORT = 3000

net
  // 接続されたら何をするか設定する
  .createServer((socket) => {
    // まずは接続されたことを表示する
    console.log('connected')

    // データを受け取ったら何をするかを設定する
    socket.on('data', (data) => {
      const httpRequest = data.toString()
      const requestLine = httpRequest.split('\r\n')[0]
      console.log(requestLine)

      const path = requestLine.split(' ')[1]
      console.log(path)

      const requestFile = path.endsWith('/') ? path + 'index.html' : path

      if (!fs.existsSync(`.${requestFile}`)) {
        const httpResponse = `HTTP/1.1 404 Not Found
content-length: 0

`
        socket.write(httpResponse)
        return
      }

      const fileContent = fs.readFileSync(`.${requestFile}`)
      const httpResponse = `HTTP/1.1 200 OK
content-length: ${fileContent.length}

${fileContent}`
      socket.write(httpResponse)
    })

    // 接続が閉じたら何をするか設定する
    socket.on('close', () => {
      console.log(`connection closed`)
    })
  })
  // ポートを指定して、サーバを起動する
  .listen(PORT, '127.0.0.1')

// サーバが起動したことを表示する
console.log(`Server started on port ${PORT}`)
