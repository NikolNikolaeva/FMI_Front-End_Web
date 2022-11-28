////Task 2

//1

let dates=new Array();

let currDate=new Date();
dates.push(currDate);
console.log(dates[0]);

//2

let newDate=new Date();
newDate.setDate(8);
newDate.setMonth(11);
newDate.setYear(2022);
newDate.setHours(21,00,00);

dates.push(newDate);
console.log(dates[1]);

//3

let newDates=new Array();

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

dates.forEach(function(item){
    newDates.push({month:getDaysInMonth(item.getFullYear(),item.getMonth()),day:item.getDay()});
});

console.log(newDates);

//4

let arrDates3=new Array();

for(let i=0;i<dates.length;i++)
{
    arrDates3.push({
        date: dates[i],
        day: newDates[i]
    });
}

console.log(arrDates3);