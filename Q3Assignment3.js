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


class Student extends Person {
    constructor(personName, age, division) {
        super(personName, age);
        this.division = division;
    }

    printDetails() {
        console.log(`${this.personName} is from ${this.division}`);
    }

    setRoll(roll) {
        if (roll < 1) {
            throw new Error("Invalid roll number!");
        }
        this.roll = roll;
    }

    getRoll() {
        return this.roll;
    }
}
