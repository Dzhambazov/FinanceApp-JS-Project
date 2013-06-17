$(function(){
	$('#accountsButton').on('click', function() {
		document.location.href = 'accounts.html'
	});

	$('#categoriesButton').on('click', function() {
		document.location.href = 'categories.html'
	});

	$('#chartsButton').on('click', function() {
		document.location.href = 'budget-chart.html'
	});

	$('#addExpense').on('click', function(){
		document.location.href = 'add-expense.html';
	})

	$('#addIncome').on('click', function(){
		document.location.href = 'add-income.html';
	})

	$('#budgetManager').on('click', function(){
		document.location.href = 'budget-manager.html';
	})
}())