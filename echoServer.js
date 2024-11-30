const net = require('net')

const PORT = 3000

net
  // 接続されたら何をするか設定する
  .createServer((socket) => {
    // まずは接続されたことを表示する
    console.log('connected')

    // データを受け取ったら何をするかを設定する
    socket.on('data', (data) => {
      // 受け取ったデータを表示する
      console.log(`received: ${data}`)
      // 受け取ったデータの内容をそのまま送り返す
      socket.write(data)
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
