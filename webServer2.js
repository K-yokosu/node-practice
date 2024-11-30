const http = require('http')
const fs = require('fs')

const PORT = 3000

http
  .createServer((request, response) => {
    const method = request.method
    const path = request.url
    console.log(`[request] ${method} ${path}`)

    const requestFile = path.endsWith('/') ? path + 'index.html' : path

    if (
      method !== 'GET' ||
      !fs.existsSync(`.${requestFile}`) ||
      fs.statSync(`.${requestFile}`).isDirectory()
    ) {
      /*
      const requestOptions = {
        method: method,
        path: path,
        headers: request.headers
      }

      const taskWebAppRequest = http.request(
        'http://localhost:8080',
        requestOptions
      )

      request.on('data', (data) => {
        taskWebAppRequest.write(data)
      })

      taskWebAppRequest.on('response', (taskWebAppResponse) => {
        Object.entries(taskWebAppResponse.headers).forEach((header) => {
          response.setHeader(header[0], header[1])
        })
        response.writeHead(taskWebAppResponse.statusCode)
        taskWebAppResponse.on('data', (data) => {
          response.write(data)
        })
        taskWebAppResponse.on('end', () => {
          response.end()
        })
      })

      request.on('end', () => {
        taskWebAppRequest.end()
      })
      return
      */
      response.writeHead(404)
      response.end()
      return
    }

    const fileContent = fs.readFileSync(`.${requestFile}`)
    response.writeHead(200)
    response.write(fileContent)
    response.end()
  })
  .listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)
