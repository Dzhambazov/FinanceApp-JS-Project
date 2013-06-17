﻿var expenses = (function () {
    var expensesStorage = storage.load("expenses");
    var expensesStorageName = 'expenses';
    var categoriesStorage = storage.load("categories");
    var categoriesStorageName = 'categories';

    var init = function () {
        if (storage.load(expensesStorageName) == null ) {
            categories.createDefaultCategoryStorage();
        };

        expensesStorage = storage.load(expensesStorageName);
        categoriesStorage = storage.load(categoriesStorageName);

        if (categoriesStorage === undefined || categoriesStorage === null) {
            categories.createDefaultCategoryStorage();
        };
        
        categoriesStorage = storage.load(categoriesStorageName);
    }
    // add expense by 6 parameters -  
    // category
    // subcategory
    // date  (format - dd/mm//yyyy  -  02.05.2013)
    // amount (number)
    // Payment method (Debit card, credit card, cash, via bank transfer .... )
    // notes (any string is allowed)
    var addExpense = function (category, subCategory, date, amount, paymentMethod, accName, notes) {

        if (isAddingExpensePossible(category, subCategory) &&
                accounts.makePayment(paymentMethod, accName, amount)) {

            var objectToAdd = createObject(date, amount, paymentMethod, accName, notes);
            expensesStorage[category][subCategory].push(objectToAdd);
            storage.save(expensesStorageName, expensesStorage);
        }
    }

    function isAddingExpensePossible(category, subcategory) {
        var isPossible = true;

        if (categoriesStorage[category] == null) {
            isPossible = false;
        } else {
            for (var i = 0; i < categoriesStorage[category].length; i++) {
                if (categoriesStorage[category][i] == subcategory) {
                    isPossible = true;
                    break;
                };
                isPossible = false;
            };
        }

        return isPossible;
    }


    function createObject(date, amount, paymentMethod, accName, notes) {
        var object = {
            date: date, amount: Number(amount), paymentMethod: paymentMethod, accName: accName, notes: notes
        }

        return object;
    }

    // Create new empty object (template)
    // saves the object in localstorage

    // function createStorage(){

    // 	var expenses = {

    // 		foodAndGroceries:{
    // 			fastFood:[],
    // 			restaurantFood:[],
    // 			groceries:[],
    // 			none:[],
    // 		},

    // 		entertainment:{
    // 			cinema:[],
    // 			bars:[],
    // 			discos:[],
    // 			vacations:[],
    // 			none:[],
    // 		},

    // 		medical:{
    // 			medicines:[],
    // 			dentist:[],
    // 			doctor:[],
    // 			none:[],
    // 		}
    // 	}

    // 	storage.save("expenses", expenses);
    // }

    // get expenses by category,  for a specific month or a whole year
    // returns an array of objects
    var getCategoryExpenses = function (category, year, month) {
        if (arguments.length == 2) {
            return yearCategoryExpenses(category, year);
        };

        if (arguments.length == 3) {
            return monthCategoryExpenses(category, year, month);
        };
    }

    // get expenses for a specific month
    // returns an array of objects
    function monthCategoryExpenses(category, year, month) {
        var result = [];
        var object = expensesStorage[category];
        var subCat = categories.getAllSubCategories(category);

        for (var i = 0; i < subCat.length; i++) {
            for (var j = 0; j < object[subCat[i]].length; j++) {
                if (getYear(object[subCat[i]][j].date) == year &&
			 		getMonth(object[subCat[i]][j].date) == month) {
                    result.push(object[subCat[i]][j]);
                };
            };
        }

        return result;
    }

    // get expenses for a specific year
    // returns an array of objects
    function yearCategoryExpenses(category, year) {
        var result = [];
        var object = expensesStorage[category];

        var subCat = categories.getAllSubCategories(category);

        for (var i = 0; i < subCat.length; i++) {
            for (var j = 0; j < object[subCat[i]].length; j++) {
                if (getYear(object[subCat[i]][j].date) == year) {
                    result.push(object[subCat[i]][j]);
                };
            };
        }

        return result;
    }

    var getAllExpensesByAccount = function (paymentMethod, accName) {
        var result = [];
        for (var category in expensesStorage) {
            var subCat = categories.getAllSubCategories(category);
            for (var i = 0; i < subCat.length; i++) {
                for (var j = 0; j < expensesStorage[category][subCat[i]].length; j++) {
                    if (expensesStorage[category][subCat[i]][j].paymentMethod == paymentMethod &&
                            expensesStorage[category][subCat[i]][j].accName == accName) {
                        result.push(expensesStorage[category][subCat[i]][j]);
                    };
                };
            }
        }
        return result;
    }

    // gets all expenses no matter the category
    // returns an array of objects
    var getAllExpenses = function (year, month) {
        if (arguments.length == 1) {
            return yearAllExpenses(year);
        };

        if (arguments.length == 2) {
            return monthAllExpenses(year, month);
        };
    }

    function yearAllExpenses(year) {
        var result = [];

        for (var category in expensesStorage) {
            var subCat = categories.getAllSubCategories(category);
            for (var i = 0; i < subCat.length; i++) {
                for (var j = 0; j < expensesStorage[category][subCat[i]].length; j++) {
                    if (getYear(expensesStorage[category][subCat[i]][j].date) == year) {
                        result.push(expensesStorage[category][subCat[i]][j]);
                    };
                };
            }
        }
        return result;
    }

    function monthAllExpenses(year, month) {
        var result = [];

        for (var category in expensesStorage) {
            var subCat = categories.getAllSubCategories(category);
            for (var i = 0; i < subCat.length; i++) {
                for (var j = 0; j < expensesStorage[category][subCat[i]].length; j++) {
                    if (getYear(expensesStorage[category][subCat[i]][j].date) == year &&
				 		getMonth(expensesStorage[category][subCat[i]][j].date) == month) {
                        result.push(expensesStorage[category][subCat[i]][j]);
                    };
                };
            }
        }
        return result;
    }

    // --------- Gets expenses sum from specific category ---------

    var getCategoryExpensesSum = function (category, year, month, monthTo) {
        if (arguments.length == 2) {
            return yearCategoryExpensesSum(category, year);
        };

        if (arguments.length == 3) {
            return monthCategoryExpensesSum(category, year, month);
        };

        if (arguments.length == 4) {
            return periodCategoryExpensesSum(category, year, month, monthTo);
        };
    }

    function yearCategoryExpensesSum(category, year) {
        var result = 0;
        var expensesList = yearCategoryExpenses(category, year);

        for (var i = 0; i < expensesList.length; i++) {
            result += expensesList[i].amount;
        };

        return Number(result.toFixed(2));
    }


    function monthCategoryExpensesSum(category, year, month) {
        var result = 0;
        var expensesList = monthCategoryExpenses(category, year, month);

        for (var i = 0; i < expensesList.length; i++) {
            result += expensesList[i].amount;
        };

        return Number(result.toFixed(2));
    }

    function periodCategoryExpensesSum(category, year, monthFrom, monthTo){
        result = 0;
        for(var i = monthFrom; i <= monthTo; i++){  
            var expensesList = monthCategoryExpenses(category, year, i)
            
            for(var j =0; j < expensesList.length; j++){
                result += expensesList[j].amount;
            }            
        }
        return Number(result.toFixed(2))
    }

    // --------- Gets expenses sum from all categories ---------

    var getAllExpensesSum = function (year, month) {
        if (arguments.length == 1) {
            return yearAllExpensesSum(year);
        };

        if (arguments.length == 2) {
            return monthAllExpensesSum(year, month);
        };
    }

    function yearAllExpensesSum(year) {
        var result = 0;
        var expensesList = yearAllExpenses(year);

        for (var i = 0; i < expensesList.length; i++) {
            result += expensesList[i].amount;
        };

        return Number(result.toFixed(2));
    }

    function monthAllExpensesSum(year, month) {
        var result = 0;
        var expensesList = monthAllExpenses(year, month);

        for (var i = 0; i < expensesList.length; i++) {
            result += expensesList[i].amount;
        };

        return Number(result.toFixed(2));
    }

    // gets a month from date (format dd//mm/yy)
    // returns a number, example  - 02
    function getMonth(date) {
        var separated = date.split('/');
        return separated[1];
    }

    // gets an year from date (format dd//mm/yy)
    // returns a number, example  - 2013
    function getYear(date) {
        var separated = date.split('/');
        return separated[2];
    }

    return {
        init: init,
        addExpense: addExpense,
        getCategoryExpenses: getCategoryExpenses,
        getAllExpenses: getAllExpenses,
        getAllExpensesSum: getAllExpensesSum,
        getCategoryExpensesSum: getCategoryExpensesSum,
        getAllExpensesByAccount: getAllExpensesByAccount,
        isAddingExpensePossible: isAddingExpensePossible
    }

}())