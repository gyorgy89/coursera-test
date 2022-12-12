var numberArray = [1,2,3,4,5,6,7,8,9,10];
console.log("numberArray: ", numberArray);

function above5 (value) {
    return value >5;
  };

var filteredNumbers = numberArray.filter(above5);
console.log("Filtered",filteredNumbers);

var shoppingList1 = ["Milk", "Donuts","Cookies"];
console.log("Shoppinglist: ", shoppingList1);

var searchValue = "Don";
function containsFilter(value) {
  return value.indexOf(searchValue) !== -1;
}

var searchShoppinglist = shoppingList1.filter(containsFilter);
console.log(searchShoppinglist);
