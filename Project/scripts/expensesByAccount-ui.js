$(function(){
	accounts.init();
    categories.init();
    expenses.init();;

    $("#backButton").bind('click', function () {
        parent.history.back();
    });

    $get = location.search;
    get = decodeURI($get);
    console.log($get);
    $get = $get.substring(1, get.length);
    $parts = get.split("&");
    $type = $parts[0].split("=")[1];
    $accName = $parts[1].split("=")[1];
    $allExpenses = expenses.getAllExpensesByAccount($type, $accName);
    $allIncomes = accounts.getAllIncomesByAccount($type, $accName);

    $("#accName").text($accName);

    $("#delete-button").on('click', { type: $type, accName: $accName }, function (event) {
        accounts.deleteAccount(event.data.type, event.data.accName);
        location.href = "accounts.html";
    });

    if ($allExpenses.length > 0 || $allIncomes.length > 0) {

        $ul = $("#list");
        $all = [];

        for (var i = 0; i < $allExpenses.length; i++) {
            $notes = $allExpenses[i].notes;
            $date = $allExpenses[i].date;
            $amount = $allExpenses[i].amount;
            $object = {date: $date, notes:$notes, amount:$amount, sign: '-'}
            $all.push($object);
        }

        for(var i=0; i < $allIncomes.length; i++){  
        	$notes = $allIncomes[i].notes;
            $date = $allIncomes[i].date;
            $amount = $allIncomes[i].amount;
            $object = {date: $date, notes:$notes, amount:$amount, sign: '+'}
            $all.push($object);
        }

        $all.sort(function(a, b) {
		   $date1 = a.date.split('/');
		   $date2 = b.date.split('/');
		   $date1Num = Number($date1[0]) + Number($date1[1]*100) + Number($date1[2]*1000);
		   $date2Num = Number($date2[0]) + Number($date2[1]*100) + Number($date2[2]*1000);
		   return ($date1Num == $date2Num) ? 0 : ($date1Num > $date2Num) ? 1 : -1;
		});
        for (var i = 0; i < $all.length; i++) {
        	$date = $all[i].date;
        	$notes = $all[i].notes;
        	$sign = $all[i].sign;
        	$amount = $all[i].amount;
        	$color = "";

        	if ($sign == '-') {
        		$amount = '-' + ' $' + $amount;
        		$color = "red";
        	}else{
        		$amount = '+' + ' $' + $amount;
        		$color = "green";
        	}

    	  $ul.append($('<li></li>')
                .attr({ 'data-theme': "c" })
                .append($('<a></a>')
                    .attr({ 'data-transition': "slide" })
                    .text($notes)
                    .append($('<span></span>')
                        .text($amount)
                        .css('color', $color)
                    )
                    .append($('<strong></strong>')
                        .text($date)
                    )
                )
            )
        };
    }

}())