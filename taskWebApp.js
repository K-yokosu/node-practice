const http = require('http')
const uid = require('uid-safe').sync

const PORT = 8080

const sessions = {}

const users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bob'
  }
]

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
    Object.entries(request.headers).forEach((header) => {
      console.log(header)
    })

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
      response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      response.writeHead(200)
      const responseBodyJson = {
        tasks: tasks
      }
      const responseBody = JSON.stringify(responseBodyJson)
      response.write(responseBody)
      response.end()
      return
    } else if (path === '/api/tasks' && method === 'POST') {
      let requestBody = ''
      request.on('data', (data) => {
        requestBody += data
      })

      request.on('end', () => {
        const requestBodyJson = JSON.parse(requestBody)
        const title = requestBodyJson.title

        if (!title || title.length < 1 || 30 < title.length) {
          response.writeHead(400)
          response.end()
          return
        }

        const task = {
          title: title,
          createdAt: new Date()
        }

        tasks.push(task)

        response.writeHead(201)
        response.end()
      })

      return
    } else if (path === '/set-cookie-sample' && method === 'GET') {
      response.setHeader('Set-Cookie', 'name=alice')
      response.writeHead(200)
      response.write('set cookie sample')
      response.end()
      return
    } else if (path === '/session-start' && method === 'GET') {
      // 実際にはここでパスワードによる認証などを行って、ユーザ ID を特定する
      const userId = 1

      const sessionId = uid(24)
      sessions[sessionId] = {
        userId: userId
      }

      response.setHeader('Set-Cookie', `sid=${sessionId}`)
      response.writeHead(200)
      response.write('session started')
      response.end()
      return
    } else if (path === '/me' && method === 'GET') {
      const cookie = request.headers.cookie
      // 「sid=abcdef」のような文字列から「abcdef」の部分を取り出す
      // 本来は Cookie が複数ある場合を想定したり、
      // sid が存在しない場合のチェックをしたりする必要がある
      const sessionId = cookie.split('=')[1]

      const session = sessions[sessionId]
      const userId = session.userId

      const user = users.find((user) => {
        return user.id === userId
      })

      response.writeHead(200)
      response.write(`userId: ${userId}, userName: ${user.name}`)
      response.end()
      return
    }

    response.writeHead(404)
    response.end()
    return
  })
  .listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)
