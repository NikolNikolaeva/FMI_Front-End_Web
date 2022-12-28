class Cat {
    constructor(name, breed, age) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }
};

function sortCats(catArray, creteria) {

    let resultArray = [...catArray];

    if (creteria == "name") {
        resultArray = resultArray.sort((x, y) => {
            if (x.name > y.name) {
                return 1;
            }
            if (x.name < y.name) {
                return -1;
            }
            return 0;
        });
    }
    else if (creteria == "breed") {
        resultArray = resultArray.sort((x, y) => x.breed.length - y.breed.length);
    }
    else if (creteria == "age") {
        resultArray = resultArray.sort((x, y) => x.age - y.age);
    }
    else if (creteria == "all") {
        resultArray = resultArray.sort((x, y) =>
         (x.breed.length+x.age+x.name.length) - (y.breed.length+y.age+y.name.length));
    }

    return resultArray;
};

//let arr = [{ "name": "Tina", "breed": "Maine Coon", "age": 2 }, { "name": "Annie", "breed": "MaineCoon", "age": 7 }, { "name": "Polly", "breed": "Brittish shorthair", "age": 3 }];
//console.log(sortCats(arr, "age"));
//console.log(sortCats(arr, "name"));
//console.log(sortCats(arr, "breed"));
//console.log(sortCats(arr, "all"));

