const http = require('http')
const fs = require('fs')

const PORT = 3000

http
  .createServer((request, response) => {
    const method = request.method
    const path = request.url
    console.log(`[request] ${method} ${path}`)

    const requestFile = path.endsWith('/') ? path + 'index.html' : path

    // ファイルが見つからんか、ディレクトリだった場合、404ではなくアプリケーションサーバの方にリクエストする
    if (
      !fs.existsSync(`.${requestFile}`) ||
      fs.statSync(`.${requestFile}`).isDirectory()
    ) {
      const requestOptions = {
        method: method,
        path: path,
        headers: request.headers
      }

      const taskWebAppRequest = http.request(
        'http://localhost:8080',
        requestOptions
      )

      taskWebAppRequest.on('response', (taskWebAppResponse) => {
        response.writeHead(taskWebAppResponse.statusCode)
        taskWebAppResponse.on('data', (data) => {
          response.write(data)
        })
        taskWebAppResponse.on('end', () => {
          response.end()
        })
      })

      taskWebAppRequest.end()
      return
    }

    const fileContent = fs.readFileSync(`.${requestFile}`)
    response.writeHead(200)
    response.write(fileContent)
    response.end()
  })
  .listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)
