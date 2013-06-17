$(function(){
	accounts.init();
    categories.init();
    expenses.init();;

		$allAccounts = storage.load("accounts");
	    $totalBalance = accounts.totalBalance();
	    
	    $("#totalBalance").text($totalBalance).css({ 'font-size': "14px", 'color': "#61B329", 'text-shadow': "text-shadow: 1px 1px 0px green" });

	    $("#add-new-account-button").on('click', function(){
	    	location.href="addAccount.html";
	    })

	    $("#homeButton").on('click', function(){
	    	location.href="index.html";
	    })

	    for ($type in $allAccounts) {

	        $accType = accounts.accTypeParser($type);
	        $totalBalance = accounts.totalBalance($type);

	        $collapse = $('<div></div>')
			.attr({ 'data-role': "collapsible", 'data-collapsed': false })
		    .append($('<h3></h3>')
		        .text($accType)//acc type
		        .append($('<span></span>')
		        	.text("$" + $totalBalance)//acc type total sum
		            .addClass("totalAccountsSum")
		        )
		    )

	        $ul = $('<ul></ul>')
                   .attr({ 'data-role': "listview", 'data-divider-theme': "b", 'data-inset': "true" });
	        for (var i = 0; i < $allAccounts[$type].length; i++) {
	            $accName = $allAccounts[$type][i].name;
	            $accBalance = $allAccounts[$type][i].balance;

	            $ul.append($('<li></li>')
		    		.attr({ 'data-theme': "c" })
		    		.append($('<a></a>')
		    			.attr({ 'data-transition': "slide" })
		    			.text($accName)
		    			.append($('<span></span>')
		    				.text("$" + Number($accBalance).toFixed(2))
	    				)
		    		).on('click', { type: $type, accName: $accName }, function (event) {
		    		    var go = "expensesByAccount.html?type=" + event.data.type + "&accName=" + event.data.accName;
		    		    document.location.href = go;
		    		})
		    	)
	            $collapse.append($ul);
	        }
	        $("#acc-container").append($collapse);
	    }

	   $transferDiv = $('<div></div>')
	    		.attr({'data-role': "content"})
	    		.css('text-align', "center")
	    		.css('margin-top', "10px")
	    		.append($('<a id="transfer-funds-button"></a>')
	    			.attr({'data-role': 'content', "data-inline": 'true', 'data-theme': 'a'})
	    			.text("Transfer Funds")
	    			.css('color', 'white')
	    			.css('border-radius', '10px')
	    			.css('cursor', 'pointer')
	    			).on('click', function(){
	    				$("#transfer-funds-div").fadeIn(1500)
	    				$("#transfer-funds-button").css('display', 'none');
	    			})


	    		$transferDivInside = $("<div id='transfer-funds-div' style='margin-top: 20px; display: none'></div>")
	    			.append($('<div data-role="fieldcontain"></div>'))

	    $labelTransferFrom = $('<label for="select-menu-from-acc"></label>').text("From:");
	    $labelTransferTo = $('<label for="select-menu-to-acc"></label>').text("To:");

	    $selectTransferFrom = $('<select id="select-menu-from-acc"></select>')
	    $selectTransferTo = $('<select id="select-menu-to-acc"></select>')

	    for($type in $allAccounts){
	    	 for (var i = 0; i < $allAccounts[$type].length; i++) {
	    	 	 $accName = $allAccounts[$type][i].name;
	    	 	 $option = $('<option></option>');
	    	 	 $option.text($accName);
	    	 	 $option.val($type + '/' + $accName);
	    	 	 $selectTransferFrom.append($option);
	    	 	 $selectTransferTo.append($option.clone());
	    	 };
	    }

	    $amountLabel = $('<label for="transferAmount"></label>').text("Amount:");
	    $amountInput = $('<input id="amountRange" placeholder="Amount here" type="range" min="0" max="0" style="width: 60px" />')
	    $transferButton = $('<a data-role="button">Transfer</a>').on('click',{accounts: accounts}, function(event){
	    	$valueFrom = $("#select-menu-from-acc").val();
	    	$typeFrom = $valueFrom.split('/')[0];
	    	$nameFrom = $valueFrom.split('/')[1];

	    	$valueTo = $("#select-menu-to-acc").val();
	    	$typeTo = $valueTo.split('/')[0];
	    	$nameTo = $valueTo.split('/')[1];

	    	$amount = $("#amountRange").val(); 
	    	event.data.accounts.makeTransfer($typeFrom, $nameFrom, Number($amount), $typeTo, $nameTo);
	    	location.reload();
	    })

	    $transferDivInside.append($labelTransferFrom);
	    $transferDivInside.append($selectTransferFrom);
	    $transferDivInside.append($labelTransferTo);
	    $transferDivInside.append($selectTransferTo);
	    $transferDivInside.append($amountLabel);
	    $transferDivInside.append($amountInput);
	    $transferDivInside.append($transferButton);
	    $transferDiv.append($transferDivInside);
	    $("#acc-container").append($transferDiv);

	    $("#select-menu-from-acc").on('change', function(){
	    	$type = $(this).val().split('/')[0];
	    	$name = $(this).val().split('/')[1];
	    	$accs = storage.load("accounts");
	    	for (var i = 0; i < $accs[$type].length; i++) {
	    		if ($accs[$type][i].name == $name) {
	    			$balance = $accs[$type][i].balance;
	    			$('#amountRange').attr({'max': $balance});
	    			break;
	    		};
	    	};
	    })
}())