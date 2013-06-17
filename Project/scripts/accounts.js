﻿var accounts = (function () {
    var accounts = storage.load("accounts");
    var accountsStorage = "accounts";
    var income = storage.load("income")
    var incomeStorage = "income";

    var init = function() {
        accounts = storage.load(accountsStorage);

        if (accounts === undefined) {
            createStorage();
            accounts = storage.load(accountsStorage);
        };

        income = storage.load(incomeStorage);
    }

    var addAccount = function (type, accName, balance, expireDate) {
        var canBalanceBeNegative = (type == "credit");

        if (accTypeExists(type) && (!accNameExists(accounts[type], accName))) {
            if (isNumber(balance) && (isPositiveNumber(balance) || canBalanceBeNegative)) {
                var account = {
                    name: accName, balance: balance, expireDate: expireDate
                }

                accounts[type].push(account);
                storage.save("accounts", accounts);
            } else {
                throw new Error("Balance should be a positive number!");
            }
        } else {
            throw new Error("Card name already exists. Please choose another name !");
        }
    }

    function accTypeExists(type) {
        var exists = false;
        var isCash = (type == "cash");
        if (accounts[type] != undefined && !isCash) {
            var exists = true;
        };
        return exists;
    }

    function accNameExists(arr, accName) {
        var exists = false;

        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == accName) {
                exists = true;
                break;
            };
        };

        return exists;
    }

    function createStorage() {
        var accounts = {
            debit: [],
            credit: [],
            bank: [],
            cash: [{ name: "cash", balance: 0 }],
        }

        storage.save("accounts", accounts);

        var income = [

        ]

        storage.save("income", income);
    }

    var deleteAccount = function (type, name) {
        if (accTypeExists(type) && accNameExists(accounts[type], name)) {
            for (var i = 0; i < accounts[type].length; i++) {
                if (accounts[type][i].name == name) {
                    accounts[type].splice(i, 1);
                    break;
                };
            };
            storage.save("accounts", accounts);
        };
    }

    var makePayment = function (accType, accName, amount) {
        var isCash = (accType == "cash");
        if (isTransferPossibleFrom(accType, accName, amount)) {
            for (var i = 0; i < accounts[accType].length; i++) {
                if (accounts[accType][i].name == accName || isCash) {
                    accounts[accType][i].balance -= amount;
                    if (!isCash) {
                        console.log(accounts[accType][i].name + " payment - " + amount);
                    } else {
                        console.log("cash" + " payment - " + amount);
                    }
                    break;
                };
            };
            storage.save("accounts", accounts);
            return true;
        }

        return false;
    }

    var totalBalance = function (accType) {
        return accType ? getAccTypeBalance(accType) : getAllAccBalance();
    }

    function getAllAccBalance() {
        var balance = 0;

        for (var k in accounts) {
            for (var i = 0; i < accounts[k].length; i++) {
                balance += parseFloat(accounts[k][i].balance);
            };
        }

        return Number(balance.toFixed(2));
    }

    function getAccTypeBalance(accType) {
        var balance = 0;
        for (var i = 0; i < accounts[accType].length; i++) {
            balance += parseFloat(accounts[accType][i].balance);
        };

        return Number(balance.toFixed(2));
    }

    var addFunds = function (accType, accName, amount, date, notes, description) {
        var accNameFound = false;
        var isCash = false;

        if (accType == "cash") {
            isCash = true;
        };

        for (var i = 0; i < accounts[accType].length; i++) {
            if (accounts[accType][i].name == accName || isCash) {
                accNameFound = true;
                if (isNumber(amount) && isPositiveNumber(amount)) {
                    accounts[accType][i].balance += amount;
                    storage.save("accounts", accounts);

                    var newObject = {
                        description: description,
                        date: date,
                        amount: amount,
                        accType: accType,
                        accName: accName,
                        notes: notes
                    }

                    income.push(newObject);
                    storage.save("income", income);

                } else {
                    alert("Amount should be a positive number !");
                }
                break;
            };
        };
        if (!accNameFound) {
            alert("Account name does not exist !");
        };
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function isPositiveNumber(n) {
        return n > 0;
    }

    var getAllIncomesSum = function (year, month) {
        return arguments.length == 1 ? getYearIncome(year) : getMonthIncome(year, month);
        // if (arguments.length == 1) {
        //     return getYearIncome(year);
        // };

        // if (arguments.length == 2) {
        //     return getMonthIncome(year, month);
        // };
    }


    function getYearIncome(year) {
        var sum = 0;
        for (var i = 0; i < income.length; i++) {
            if (getYear(income[i].date) == year) {
                sum += income[i].amount;
            };
        };
        return Number(sum.toFixed(2));
    }

    function getMonthIncome(year, month) {
        var sum = 0;
        for (var i = 0; i < income.length; i++) {
            if (getYear(income[i].date) == year &&
					getMonth(income[i].date) == month) {
                sum += income[i].amount;
            };
        };
        return Number(sum.toFixed(2));
    }

    function getMonth(date) {
        var separated = date.split('/');
        return separated[1];
    }

    function getYear(date) {
        var separated = date.split('/');
        return separated[2];
    }

    var makeTransfer = function (accTypeFrom, accNameFrom, amount, accTypeTo, accNameTo) {
        if (isTransferPossible(accTypeFrom, accNameFrom, amount, accTypeTo, accNameTo)) {

            for (var i = 0; i < accounts[accTypeFrom].length; i++) {
                if (accounts[accTypeFrom][i].name == accNameFrom) {
                    accounts[accTypeFrom][i].balance -= amount;
                };
            };

            for (var i = 0; i < accounts[accTypeTo].length; i++) {
                if (accounts[accTypeTo][i].name == accNameTo) {
                    accounts[accTypeTo][i].balance += amount;
                };
            };

            storage.save("accounts", accounts);
        };
    }

    function isTransferPossible(accTypeFrom, accNameFrom, amount, accTypeTo, accNameTo) {
        var transferPossibleFrom = isTransferPossibleFrom(accTypeFrom, accNameFrom, amount);
        var transferPossibleTo = isTransferPossibleTo(accTypeTo, accNameTo);
        return transferPossibleFrom && transferPossibleTo;
    }

    function isTransferPossibleFrom(accTypeFrom, accNameFrom, amount) {
        var isItNumber = false;
        var isPositive = false;
        var enoughFunds = false;
        var canBalanceBeNegative = (accTypeFrom == "credit");
        var isCash = (accTypeFrom == "cash");

        if (accounts[accTypeFrom] != null) {
            for (var i = 0; i < accounts[accTypeFrom].length; i++) {
                if (accounts[accTypeFrom][i].name == accNameFrom || isCash) {
                    if (isNumber(amount)) {
                        isItNumber = true;
                        if (isPositiveNumber(amount)) {
                            isPositive = true;
                            if (accounts[accTypeFrom][i].balance > amount || canBalanceBeNegative) {
                                enoughFunds = true;
                                break;
                            } else {
                                throw new Error("Insufficient funds in the account!");
                                break;
                            }
                        } else {
                            throw new Error("Amount should be a possitive number!");
                            break;
                        }
                    } else {
                        throw new Error("Amount should be a number!");
                    }
                };
            };
        };
        return isNumber && isPositiveNumber && enoughFunds;
    }

    function isTransferPossibleTo(accTypeTo, accNameTo) {
        var isPossible = false;

        if (accounts[accTypeTo] != null) {
            for (var i = 0; i < accounts[accTypeTo].length; i++) {
                if (accounts[accTypeTo][i].name == accNameTo) {
                    isPossible = true;
                    break;
                };
            };
        };
        return isPossible;
    }


    var accTypeParser = function (type) {
        switch (type) {
            case "debit":
                return "Debit Cards";
                break;

            case "credit":
                return "Credit Cards";
                break;

            case "bank":
                return "Bank Accounts";
                break;

            case "cash":
                return "Cash";
                break;
        }
    }

    // var getAllExpensesByAccount = function (paymentMethod, accName) {
    //     var result = [];
    //     for (var category in expensesStorage) {
    //         var subCat = categories.getAllSubCategories(category);
    //         for (var i = 0; i < subCat.length; i++) {
    //             for (var j = 0; j < expensesStorage[category][subCat[i]].length; j++) {
    //                 if (expensesStorage[category][subCat[i]][j].paymentMethod == paymentMethod &&
    //                         expensesStorage[category][subCat[i]][j].accName == accName) {
    //                     result.push(expensesStorage[category][subCat[i]][j]);
    //                 };
    //             };
    //         }
    //     }
    //     return result;
    // }

    var getAllIncomesByAccount = function(paymentMethod, accName){
        var result = [];
        var incomes = storage.load("income");
        for(var i =0; i < incomes.length; i++){
            if (incomes[i].accType == paymentMethod &&
                incomes[i].accName == accName) {
                result.push(incomes[i]);
            };
        }
        return result;
    }

    return {
        init: init,
        addAccount: addAccount,
        makePayment: makePayment,
        totalBalance: totalBalance,
        addFunds: addFunds,
        getAllIncomesSum: getAllIncomesSum,
        makeTransfer: makeTransfer,
        deleteAccount: deleteAccount,
        accTypeParser: accTypeParser,
        getAllIncomesByAccount: getAllIncomesByAccount,

    }
}());