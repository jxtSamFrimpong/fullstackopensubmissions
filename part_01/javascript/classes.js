class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    greet() {
        console.log('hello, my name is ' + this.name + ' I am ' + this.age + ' years old')
    }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()
setTimeout(adam.greet, 1000)

const janja = new Person('Janja Garnbret', 23)
janja.greet()