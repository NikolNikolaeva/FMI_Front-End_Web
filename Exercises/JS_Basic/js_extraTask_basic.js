/////Task 3

//1
let myArray = [1, 50, 24, 87, 3];   //Example

let result = {
    isContain50: false,
    isSum50: false,
    withNumToAddToSum50: 0
};

let sum = 0;
myArray.forEach(function (item) {

    if (item == 50) {
        result.isContain50 = true;
    }


    sum += item;
});

if (sum == 50) {
    result.isSum50 = true;
}
else {
    result.withNumToAddToSum50 = 50 - sum;
}

console.log(result);


//2

let text = "aaassdddf";  //Example

let alphabet = new Array(26);

for (let i = 0; i < alphabet.length; i++) {
    alphabet[i] = 0;
};

for (let i = 0; i < text.length; i++) {
    alphabet[text[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
};

console.log(alphabet);

var maxNum = Math.max(...alphabet);

for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] == maxNum) {
        console.log(String.fromCharCode(97 + i));
    }
};

//3

let array = [1, 1, 3, 3, 3, 5, 5,  7, 7, 7, 5, 3];   //Example

let counter = 0;

function longestSubArray(...array) {

    var counter = 1;
    var maxSubArray = 0;
    for (let i = 1; i < array.length; i++) {

        if (array[i] === array[i - 1]) {
            ++counter;
        }
        else {
            counter = 1;
        }
        if (counter > maxSubArray) {
            maxSubArray = counter;
        }
    }

    return maxSubArray;
};

let maxSubArray = longestSubArray(...array);
console.log(maxSubArray);