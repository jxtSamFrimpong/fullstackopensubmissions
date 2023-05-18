const genRandIndex = () => {
    let someNum = Math.ceil(Math.random() * 1000);
    if (persons.map(p => p.id).find(i => i === someNum) !== undefined) {
        console.log(someNum);
        someNum = genRandIndex();
    }
    return someNum;
}

module.exports = genRandIndex;