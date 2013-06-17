$(function(){
	accounts.init();
    categories.init();
    expenses.init();;

    $("#backButton").bind('click', function () {
        location.href = "index.html";
    });

    var allCategories = categories.getAllCategories();

    for (var i = 0; i < allCategories.length; i++) {
        var category = allCategories[i];

        $collapse = $('<div></div>')
		.attr({ 'data-role': "collapsible", 'data-collapsed': false })
	    .append($('<h3></h3>')
	        .text(category)//acc type
	    )

        $ul = $('<ul></ul>')
               .attr({ 'data-role': "listview", 'data-divider-theme': "b", 'data-inset': "true" });

        var allSubCat = categories.getAllSubCategories(category);

        for (var j = 0; j < allSubCat.length; j++) {
            var subCat = allSubCat[j];
            var id = category + "-" + subCat;
            $ul.append($('<li></li>')
	    		.attr({ 'data-theme': "c", 'id': id })
	    		.append($('<a></a>')
	    			.attr({ 'data-transition': "slide" })
	    			.text(subCat)
	    			.css("display", "inline-block")
	    		)
	    		.append($('<img class="removeButton" src="images/remove.png" />')
	    			.on('click',{category: category, subCat: subCat, id: id}, function(event){
	    				 categories.deleteSubCategory(event.data.category, event.data.subCat);
	    				 $id = "#" + event.data.id;
	    				$($id).remove();
	    			})
	    		)
	    	)
            $collapse.append($ul);
        }

        $li = $('<li></li>')
              .attr({ 'data-theme': "c" })
              .addClass('not-added-item')
              .on('click', { category: category }, function (event) {
                  $(this).find('.ui-link-inherit').toggle();
                  $(this).find('#newCategoryField').toggle().focus();
              })
              .append($('<img class="addButton" src="images/add.png" />'))
              .append($('<a></a>')
                  .attr({ 'data-transition': "slide" })
                  .css("color", "green")
                  .css("height", "12px")
                  .text("add new subcategory")
              ).append("<input id='newCategoryField' type='text' placeholder='New Subcategory here' style='display: none; '/>")
                    .on('keydown', {category: category}, function (event) {
                        if (event.keyCode == 13) {
                            // console.log(event.data.category);
                            var catField = $(this).find('#newCategoryField');
                            if (catField.val().length > 1) {                                    // TODO check input !
                                categories.addSubCategory(event.data.category, catField.val());
                                var prevClone = $(this).prev().clone();
                                $(this).before(prevClone);
                                prevClone.find('.ui-link-inherit').text(catField.val());
                                $(this).find('a').show();
                                catField.val('');
                                catField.hide();
                            };
                        };
                    })
        $ul.append($li);
        $collapse.append($ul);
        $("#acc-container").append($collapse);
    }
}())