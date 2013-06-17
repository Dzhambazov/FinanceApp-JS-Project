$(function(){
	accounts.init();
        categories.init();
        expenses.init();

        $data = location.search;
        $data = $data.substring(1, $data.length);
        $monthFrom = parseInt($data.split("&")[0]);
        $monthTo = parseInt($data.split("&")[1]);
        $year = $data.split("&")[2];

        for (var i = $monthFrom; i <= $monthTo; i++) {
            var month = "";

            if (i < 10) {
                month = "0" + i;
            }
            else {
                month = "" + i;
            }            

            homeBudget.addExpenses(month, $year);
            homeBudget.addIncomes(month, $year);
            homeBudget.addBudget(month, $year);
        }

        // Currently is supported only the input ["Date", "Incomes", "Expenses", "Budget"]
        DrawChart(["Date", "Incomes", "Expenses", "Budget"], $monthFrom, $monthTo, $year);

        $('#homeButton').on('click', function() {
            location.href = 'index.html';
        })

    function getData(){
        $allCategories = storage.load("categories");
        $data = [];
        for($category in $allCategories){
            $sum = expenses.getCategoryExpensesSum($category, $year, $monthFrom, $monthTo);
            $item = [$category, Number($sum)];
            $data.push($item);
        }
        return $data;
      }

      google.load('visualization', '1.0', {'packages':['corechart']});
      google.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows(getData($year));

        var options = {'title':' Expenses by category: ' + $monthFrom + ' ' + $year + ' - ' + $monthTo + ' ' + $year,
                       'width':400,
                       'height':300};

        var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
      }

}())