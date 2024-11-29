const http = require('http')

const PORT = 8080

function getTasksHTML() {
  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>tasks</title>
  </head>
  <body>
    <h1>タスク一覧</h1>
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>作成日時</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>フロントエンドの実装</td>
          <td>2022-06-17 01:23:45</td>
        </tr>
        <tr>
          <td>サーバサイドの実装</td>
          <td>2022-06-17 01:23:45</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`
}

http
  .createServer((request, response) => {
    const path = request.url
    console.log(`[request] ${path}`)

    if (path === '/tasks') {
      response.writeHead(200)
      const responseBody = getTasksHTML()
      response.write(responseBody)
      response.end()
      return
    }

    response.writeHead(404)
    response.end()
    return
  })
  .listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)
