const http = require('http')
const fs = require('fs')

const PORT = 3000

// httpリクエストがある度に、まとまった単位で処理を行うことができる
http.createServer((request, response) => {
    // 処理内容を書く
    const path = request.url
    console.log(`[request] ${path}`)

    const requestFile = path.endsWith('/') ? path + 'index.html' : path

    if(!fs.existsSync(`.${requestFile}`)){
        response.writeHead(404)
        response.end()
        return
    }

    const fileContent = fs.readFileSync(`.${requestFile}`)
    response.writeHead(200)
    response.write(fileContent)
    response.end()
}).listen(PORT, '127.0.0.1')

console.log(`Server started on port ${PORT}`)