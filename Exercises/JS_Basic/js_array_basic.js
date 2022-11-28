///////Task 1

//1
let myArrayA = [10, 5, 13, 18, 51];

myArrayA.forEach(function (item) {
    console.log(item);
});

//2

let myArrayB = myArrayA;

myArrayB.forEach(function (item) {
    console.log(item * 2);
});

//3

let result=myArrayA.filter(item=>item%2==0);

result.forEach(function(item){
console.log(item);
});

//4

let result2=myArrayA.filter(item=>item<10);

console.log(Boolean(result2));

//5

let result3=myArrayA.filter(item=>item%3==0);

console.log(result3);

//6

const initialValue = 0;
const sumWithInitial = myArrayA.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue
);

console.log(sumWithInitial);

//7

let myArrayB2=myArrayA.slice(-2);

myArrayB2.forEach(function(item){
    console.log(item);
    });


