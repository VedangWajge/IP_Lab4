class Person {
    constructor(personName, age) {
        this.personName = personName;
        this.age = age;
    }

    printDetails() {
        console.log(`${this.personName} is ${this.age} years old`);
    }

    setDetails(personName, age) {
        this.personName = personName;
        this.age = age;
    }

    checkAdult() {
        if (this.age >= 18) {
            console.log(`${this.personName} is an adult`);
        }
    }
}
