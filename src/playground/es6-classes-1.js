class Person {
    constructor(name = "John Smith", age = 0) {
        this.name = name;
        this.age = age;
    }

    getGreeting() {
        return `Hi, I am ${this.name}.`;
    }

    getDescription() {
        return `${this.name} is ${this.age} year(s) old`;
    }

}


class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }

    hasHomeLocation() {
        return !!this.homeLocation;
    }

    getGreeting() {
        let greeting = super.getGreeting();

        if (this.hasHomeLocation()) {
            greeting += ` I'm visiting from ${this.homeLocation}`;
        }

        return greeting;
    }
}

