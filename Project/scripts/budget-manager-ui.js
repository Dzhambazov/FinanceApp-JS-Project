$(function(){
	accounts.init();
    categories.init();
    expenses.init();;

    $("#backButton").bind('click', function () {
        window.location.href = "index.html";
    });


	$date = new Date();
	$currentMonth = $date.getMonth()+1;
	$currentYear = $date.getFullYear();
	function monthParser(month){
		if (month < 10) {
			return '0' + month;
		}else{
			return month;
		}
	}

	//Home
	$expensesForMonth = expenses.getCategoryExpensesSum("home", $currentYear, monthParser($currentMonth));
	$budgetMoney = Number($("#budgetMoneyHome").text());
	$leftMoney = $budgetMoney - $expensesForMonth;
	$percentHome = ($expensesForMonth / $budgetMoney)*100;

	$leftMoneyColor = "";
	if ($leftMoney > 0) {
		$leftMoneyColor = "green";
	}else{
		$leftMoneyColor = "red";
	}

	$("#spendMoneyHome").text('$' + $expensesForMonth);
	$("#leftMoneyHome")
		.text('$' + $leftMoney.toFixed(2))
		.css('color', $leftMoneyColor);


	$(function() {
	    $( "#progressbarHome" ).progressbar({
	      value: $percentHome
	    });
	  });

	//Utilities
	$expensesForMonth = expenses.getCategoryExpensesSum("utilities", $currentYear, monthParser($currentMonth));
	$budgetMoney = Number($("#budgetMoneyUtilities").text());
	$leftMoney = $budgetMoney - $expensesForMonth;
	$percentUtilities = ($expensesForMonth / $budgetMoney)*100;

	$leftMoneyColor = "";
	if ($leftMoney > 0) {
		$leftMoneyColor = "green";
	}else{
		$leftMoneyColor = "red";
	}

	$("#spendMoneyUtilities").text('$' + $expensesForMonth);
	$("#leftMoneyUtilities")
		.text('$' + $leftMoney.toFixed(2))
		.css('color', $leftMoneyColor);


	$(function() {
	    $( "#progressbarUtilities" ).progressbar({
	      value: $percentUtilities
	    });
	  });

	//Food and Groceries
	$expensesForMonth = expenses.getCategoryExpensesSum("foodAndGroceries", $currentYear, monthParser($currentMonth));
	$budgetMoney = Number($("#budgetMoneyFood").text());
	$leftMoney = $budgetMoney - $expensesForMonth;
	$percentFood = ($expensesForMonth / $budgetMoney)*100;

	$leftMoneyColor = "";
	if ($leftMoney > 0) {
		$leftMoneyColor = "green";
	}else{
		$leftMoneyColor = "red";
	}

	$("#spendMoneyFood").text('$' + $expensesForMonth);
	$("#leftMoneyFood")
		.text('$' + $leftMoney.toFixed(2))
		.css('color', $leftMoneyColor);


	$(function() {
	    $( "#progressbarFood" ).progressbar({
	      value: $percentFood
	    });
	  });


	//Entertainment

	$expensesForMonth = expenses.getCategoryExpensesSum("entertainment", $currentYear, monthParser($currentMonth));
	$budgetMoney = Number($("#budgetMoneyEntertainment").text());
	$leftMoney = $budgetMoney - $expensesForMonth;
	$percentEntertainment = ($expensesForMonth / $budgetMoney)*100;

	$leftMoneyColor = "";
	if ($leftMoney > 0) {
		$leftMoneyColor = "green";
	}else{
		$leftMoneyColor = "red";
	}

	$("#spendMoneyEntertainment").text('$' + $expensesForMonth);
	$("#leftMoneyEntertainment")
		.text('$' + $leftMoney.toFixed(2))
		.css('color', $leftMoneyColor);


	$(function() {
	    $( "#progressbarEntertainment" ).progressbar({
	      value: $percentEntertainment
	    });
	  });

	//Medical

	$expensesForMonth = expenses.getCategoryExpensesSum("medical", $currentYear, monthParser($currentMonth));
	$budgetMoney = Number($("#budgetMoneyEntertainment").text());
	$leftMoney = $budgetMoney - $expensesForMonth;
	$percentMedical = ($expensesForMonth / $budgetMoney)*100;

	$leftMoneyColor = "";
	if ($leftMoney > 0) {
		$leftMoneyColor = "green";
	}else{
		$leftMoneyColor = "red";
	}

	$("#spendMoneyMedical").text('$' + $expensesForMonth);
	$("#leftMoneyMedical")
		.text('$' + $leftMoney.toFixed(2))
		.css('color', $leftMoneyColor);


	$(function() {
	    $( "#progressbarMedical" ).progressbar({
	      value: $percentMedical
	    });
	  });
}())