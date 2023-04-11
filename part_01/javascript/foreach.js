const someFunction = (item, index, arr) => {
    // return index ** item
    arr[index] = index ** item
    //console.log(index ** item)
}

let arr = [0, 1, 2, 3, 4]

arr.forEach(
    someFunction
)

console.log(arr)