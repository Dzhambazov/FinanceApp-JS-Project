$(function(){
	accounts.init();
    $("#save-account-button").on('click', function(){
        var type = $('#type').val();
        var accName = $('#name').val();
        var balance = $('#balance').val();
        var date = $('#datepicker').val();

        // check if successfully added!
        accounts.addAccount(type, accName, Number(balance), date);
        location.href="accounts.html";
    })

    $("#backButton").on('click', function(){
        parent.history.back();
    })
}())