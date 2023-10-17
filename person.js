class Person {
    constructor(name, age) {
    // properties
        this.name = name;
        this.age = age;
    };

    // methods
    greeting() {
        console.log(`My name is ${this.name} and I am ${this.age}`);
    };
};

module.exports = Person;