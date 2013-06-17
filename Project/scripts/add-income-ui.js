$(function(){
	$paymentMethodsMenu = $("#paymentMethods").on('change', function(){
		$paymentMethod = $("#paymentMethods").val();
		console.log($paymentMethod);
		$allPaymentMethods = storage.load("accounts");
		$("#accountsMenu").empty();
		for (var i = 0; i < $allPaymentMethods[$paymentMethod].length; i++) {
			$account = $allPaymentMethods[$paymentMethod][i].name;
			$option = $("<option></option>");
			$option.val($account);
			$option.text($account);
			$("#accountsMenu").append($option);
		};
	})

	$("#add-income-button").on('click', function(){
		$date = $("#datepicker").val();
		$amount = $("#amount").val();
		$paymentMethod = $("#paymentMethods").val();
		$account = $("#accountsMenu").val();
		$notes = $("#notes").val();

        accounts.addFunds($paymentMethod, $account, Number($amount), $date, $notes, "sth");
		document.location.href="index.html"
	})

    $("#accountsMenu").on('change', function(){
        $type = $("#paymentMethods").val();
        $name = $("#accountsMenu").val();
        $accounts = storage.load("accounts");

        for (var i = 0; i < $accounts[$type].length; i++) {
            if ($accounts[$type][i].name == $name) {
                $balance = $accounts[$type][i].balance;
                $("#availableMoney").text(Number($balance).toFixed(2))
                if (Number($("#availableMoney").text()) > 0) {
                    $("#availableMoney").css('color', "green");
                }else{
                    $("#availableMoney").css('color', 'red');
                }
            };
        };
    })

	$("#subcategories").on('click', function(){
		console.log($(this).val());
	})

	$("#home-button").on('click', function(){
		location.href = "index.html";
	})
}())