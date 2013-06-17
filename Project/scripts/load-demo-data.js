$(function(){
	
	accounts.init();
    categories.init();
    expenses.init();;

     $(document).ready(function() {
	  if (storage.load("income").length == 0) {
	 		loadDemoData();
	 	};
	});

	//load demo data
    function loadDemoData(){
	    accounts.addAccount("credit", "Visa", -720.00, "16/09/2014");
	    accounts.addAccount("credit", "Master Card", -1520.00, "16/11/2014");
	    accounts.addAccount("debit", "Visa Electron", 1280.24, "24/11/2014");
	    accounts.addAccount("debit", "Visa Electron FB", 1290.24, "24/11/2015");
	    accounts.addAccount("debit", "Maestro", 2670.21, "24/11/2015");
	    accounts.addAccount("bank", "CCB", 1500.00, "24/11/2015");
	    accounts.addAccount("bank", "PCBank", 950.00, "24/11/2015");

	    accounts.addFunds("cash", "", 1200.00, "11/5/2013", "regular salary", "salary");


	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/01/2013", "regular salary", "salary");
	    accounts.addFunds("cash", "cash", 670.00, "17/01/2013", "poker winnings", "poker winnings");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/02/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/03/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/04/2013", "regular salary", "salary");
	    accounts.addFunds("cash", "cash", 980.00, "25/04/2013", "poker winnings", "poker winnings");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/05/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/06/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/07/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/08/2013", "regular salary", "salary");
	    accounts.addFunds("cash", "cash", 980.00, "11/08/2013", "poker winnings", "poker winnings");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/09/2013", "regular salary", "salary");
	    accounts.addFunds("credit", "Visa", 1200.00, "01/10/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/11/2013", "regular salary", "salary");
	    accounts.addFunds("debit", "Visa Electron", 1200.00, "01/12/2013", "regular salary", "salary");
	    accounts.addFunds("cash", "cash", 980.00, "11/12/2013", "poker winnings", "poker winnings");

	    expenses.addExpense("home", "rent", "27/01/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/02/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/03/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/04/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/05/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/06/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/07/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/08/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/09/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/10/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/11/2013", 400, "debit", "Visa Electron", "rent paid");
	    expenses.addExpense("home", "rent", "27/12/2013", 400, "debit", "Visa Electron", "rent paid");


	    expenses.addExpense("foodAndGroceries", "groceries", "27/01/2013", 242.66, "debit", "Visa Electron", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/02/2013", 142.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/03/2013", 542.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/04/2013", 142.66, "debit", "Visa Electron", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/05/2013", 442.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/06/2013", 142.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/07/2013", 542.66, "debit", "Visa Electron", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/08/2013", 142.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/09/2013", 182.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/10/2013", 442.66, "cash", "cash", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/11/2013", 192.66, "debit", "Visa Electron", "Jack Daniels");
	    expenses.addExpense("foodAndGroceries", "groceries", "27/12/2013", 342.66, "cash", "cash", "Jack Daniels");

	    expenses.addExpense("entertainment", "discos", "27/01/2013", 242.66, "debit", "Visa Electron", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/02/2013", 142.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/03/2013", 542.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/04/2013", 142.66, "debit", "Visa Electron", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/05/2013", 442.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/06/2013", 142.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/07/2013", 542.66, "debit", "Visa Electron", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/08/2013", 142.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/09/2013", 182.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/10/2013", 442.66, "cash", "cash", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/11/2013", 192.66, "debit", "Visa Electron", "Plazza");
	    expenses.addExpense("entertainment", "discos", "27/12/2013", 342.66, "cash", "cash", "Plazza");


	    expenses.addExpense("utilities", "electricity", "15/01/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/02/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/03/2013", 92.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/04/2013", 82.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/05/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/06/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/07/2013", 52.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/08/2013", 52.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/09/2013", 42.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/10/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/11/2013", 72.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "electricity", "15/12/2013", 72.66, "debit", "Visa Electron", "electricity paid");


	    expenses.addExpense("utilities", "cellPhone", "15/01/2013", 82.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/02/2013", 77.56, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/03/2013", 92.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/04/2013", 82.62, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/05/2013", 71.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/06/2013", 62.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/07/2013", 52.61, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/08/2013", 52.62, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/09/2013", 82.86, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/10/2013", 73.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/11/2013", 105.66, "debit", "Visa Electron", "electricity paid");
	    expenses.addExpense("utilities", "cellPhone", "15/12/2013", 79.66, "debit", "Visa Electron", "electricity paid");

	    expenses.addExpense("medical", "dentist", "20/02/2013", 671.00, "credit", "Visa", "dentist");
	    expenses.addExpense("medical", "dentist", "20/06/2013", 271.00, "credit", "Visa", "dentist");
	    expenses.addExpense("medical", "dentist", "20/10/2013", 471.00, "credit", "Visa", "dentist");



	     
	    expenses.addExpense("foodAndGroceries", "fastFood", "13/05/2013", 14.66, "cash", "cash", "Subway sandwiches");
	    expenses.addExpense("entertainment", "discos", "14/06/2013", 157.99, "credit", "Master Card", "Plazza");
	    expenses.addExpense("foodAndGroceries", "groceries", "05/06/2013", 60.22, "credit", "Master Card", "Kaufland");
	    expenses.addExpense("foodAndGroceries", "groceries", "05/06/2013", 60.22, "debit", "Visa Electron", "Kaufland");
	}
 
}())