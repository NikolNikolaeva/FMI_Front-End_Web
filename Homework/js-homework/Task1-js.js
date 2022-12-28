//Task 1

class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    showPersonInfo() {
        console.log(`name: ${this.name}\nage: ${this.age}\ngender: ${this.gender}`);
    };
};

class Student extends Person {
    constructor(name, age, gender, grade) {
        super(name, age, gender);
        this.grade = grade;
    }

    showStudentInfo() {
        this.showPersonInfo();
        console.log(`grade: ${this.grade}`);
    };
};

class Employee extends Person {
    constructor(name, age, gender, daySalary) {
        super(name, age, gender);
        this.daySalary = daySalary;
    }

    showEmployeeInfo() {
        this.showPersonInfo();
        console.log(`daySalary: ${this.daySalary}`);
    };

    calculateOvertime(hours) {
        let overtime = this.age >= 18 ? 1.5 : 0;
        return hours * overtime * (this.daySalary / 8);
    };
};

const arrPeople = new Array(10);

const ivan = new Person('Ivan', 24, "male");
const drago = new Employee("Drago", 23, 'male', 50);
const pencho = new Student("Pencho", 23, 'male', 253);
const gosho = new Person('Gosho', 24, 'male');
const dimitur = new Employee("Mitko", 17, 'male', 50);
const penko = new Student("Penko", 23, 'male', 253);

arrPeople.push(ivan);
arrPeople.push(drago);
arrPeople.push(pencho);
arrPeople.push(gosho);
arrPeople.push(dimitur);
arrPeople.push(penko);

arrPeople.forEach((person) => {

    if (person.constructor.name == "Person") {
        person.showPersonInfo();
    }
    else if (person.constructor.name == "Student") {
        person.showStudentInfo();
    }
    else if (person.constructor.name == "Employee") {
        person.showEmployeeInfo();
    }
});

arrPeople.forEach((person) => {

    if (person.constructor.name == "Employee") {
        person.showEmployeeInfo();
        console.log(`Overtime bonus: ${person.calculateOvertime(2)}`);
    }
});