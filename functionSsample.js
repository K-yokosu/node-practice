// 関数呼び出し
function add(v1, v2){
    return v1+v2
}

const result1 = add(1,2);
console.log(`result1 = ${result1}`)

// 無名関数を代入して呼び出し
const add2 = function (v1, v2){
    return v1+v2
}
console.log(add2)

const result2 = add2(1,2);
console.log(`result2 = ${result2}`)

// アロー関数呼び出し
const add3 = (v1, v2) => {
    return v1+v2
}
const result3 = add3(1,2);
console.log(`result3 = ${result3}`)