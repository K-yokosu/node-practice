const net = require('net')

const PORT = 3000

const helloResponse = `HTTP/1.1 200 OK
content-length: 152

<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>hello</title>
    </head>
    <body>
        <h1>Hello</h1>
    </body>
</html>
`

net
  // 接続されたら何をするか設定する
  .createServer((socket) => {
    // まずは接続されたことを表示する
    console.log('connected')

    // データを受け取ったら何をするかを設定する
    socket.on('data', (data) => {
      // const httpRequest = data.toString()
      // const requestLine = httpRequest.split(`\r\n`)[0]
      // console.log(requestLine)
      socket.write(helloResponse)
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