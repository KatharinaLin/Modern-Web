window.onload = function() {
	var trs=$("th");
	$("th").each(function() {
		$(this).closest("th").val(true);
	})
	$("th").click(function() { 
		clear();
		var identity = $(this).closest("thead").parent().attr('id');
		var trs=$("#"+identity+" tr th");
		var index =trs.index($(this).closest("tr th"))+1;
		
		var v = [];
		var $child = $("#"+identity+" tr td:nth-child("+index.toString()+")");

		$child.each(function () {
			v.push($(this).text());
		});
		v.sort();
	 	if(!$(this).closest("th").val()) {
	 		$(this).closest("th").val(true);
	 		v.reverse();
	 		$(this).closest("th").addClass("descend");
	 	} else {
	 		$(this).closest("th").val(false);
	 		$(this).closest("th").addClass("ascend");
	 	}
	 	for(var i= 0; i< v.length;i++) {
			$child.each(function () {
			      if ($(this).text() == v[i]) {
			      	var indexs =trs.index($(this).closest("td"));
			      	var n;
			      	if (indexs >= i) n = indexs-i;
			      	else n = i - indexs;
		      		while (n--) {
		      			var $tr = $(this).parents("tr");
		      			if (indexs >= i) $tr.prev().before($tr);
		      			else $tr.next().after($tr);
		      		}		
			      }  
	        });
	   }
    });
}

function clear() {
	$("th").each(function() {
		if ($(this).closest("th").hasClass("ascend")) {
			$(this).closest("th").removeClass("ascend");
		}
		if ($(this).closest("th").hasClass("descend")) {
			$(this).closest("th").removeClass("descend");
		}
	})
}
