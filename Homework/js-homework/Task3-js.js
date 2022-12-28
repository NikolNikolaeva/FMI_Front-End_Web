function palindroms(array)
{
    const reverse = str => Array.from(str).reverse().join('');

    let arrayWithPalindroms=new Array();
    arrayWithPalindroms=array.filter(str=>reverse(str)==str);

    return arrayWithPalindroms;
};

//let array=["abccba", "lalala", "something", "123321", "debel lebed"];
//console.log(palindroms(array));