function add(v1, v2){
    return v1+v2
}

function calculate(v1,v2,callback){
    return callback(v1,v2)
}

const addResult = calculate(1,2,add)
console.log(addResult)

function multiply(v1, v2){
    return v1*v2
}
const multiplyResult = calculate(1,2,multiply)
console.log(multiplyResult)

// callbackの代表例
// function hello(){
//     console.log('hello')
// }
// setTimeout(hello, 5000)

// よく見るのはこの形
setTimeout(() => {
    console.log('hello')
}, 5000)