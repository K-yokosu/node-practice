const fs = require('fs')
const util = require('util')

const promisifyReadFile = util.promisify(fs.readFile)

/*
function main() {
  let fileContent

  fs.readFile('index.html', (err, data) => {
    fileContent = data.toString()
    console.log(fileContent)
  })

  console.log(fileContent)
}
*/

/*
const readFilePromise = promisifyReadFile('index.html')

readFilePromise.then((data) => {
  const fileContent = data.toString()
  console.log(fileContent)
})
*/

async function main() {
  const data = await promisifyReadFile('index.html')
  const fileContent = data.toString()
  console.log(fileContent)
}

main()
