const http = require('http')

const PORT = 8080

const tasks = [
  {
    title: 'フロントエンドの実装',
    createdAt: new Date()
  },
  {
    title: 'サーバサイドの実装',
    createdAt: new Date()
  }
]

function getTasksHTML() {
  const tasksHTMLElement = tasks
    .map((task) => {
      return `<tr>
  <td>${task.title}</td>
  <td>${task.createdAt}</td>
</tr>`
    })
    .join('')

  return `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>tasks</title>
  </head>
  <body>
    <h1>タスク一覧</h1>
    <a href="/tasks/new.html">タスク登録へ</a>
    <table>
      <thead>
        <tr>
          <th>タイトル</th>
          <th>作成日時</th>
        </tr>
      </thead>
      <tbody>
        ${tasksHTMLElement}
      </tbody>
    </table>
  </body>
</html>
`
}

http
  .createServer((request, response) => {
    const method = request.method
    const path = request.url
    console.log(`[request] ${method} ${path}`)

    if (path === '/tasks' && method === 'GET') {
      response.writeHead(200)
      const responseBody = getTasksHTML()
      response.write(responseBody)
      response.end()
      return
    } else if (path === '/tasks' && method === 'POST') {
      let requestBody = ''
      request.on('data', (data) => {
        requestBody += data
      })

      request.on('end', () => {
        const title = requestBody.split('=')[1]

        const task = {
          title: title,
          createdAt: new Date()
        }

        tasks.push(task)

        response.writeHead(303, {
          Location: '/tasks'
        })
        response.end()
      })

      return
    } else if (path === '/api/tasks' && method === 'GET') {
      response.writeHead(200)
      const responseBodyJson = {
        tasks: tasks
      }
      const responseBody = JSON.stringify(responseBodyJson)
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
