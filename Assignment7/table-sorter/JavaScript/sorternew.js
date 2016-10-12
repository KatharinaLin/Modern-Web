

	
		var Sorter = function() {
			this.inicialize();
			this.getSorterColumn();
		}

		var sorterProto = Sorter.prototype;

		sorterProto.inicialize = function() {
			$("th").each(function() {
				$(this).closest("th").val(1);

			})
			$("thead td").each(function() {
				$(this).closest("thead td").val(1);
			})
			this.sorterArray = [];
		}

        var indexs;
		sorterProto.getSorterColumn = function() {
			var that = this;
			$("th").click(function() {
				that.clear();
				that.$table = $(this).parents("table").children("tbody").children("tr");
				that.index = $(this).index();
				indexs = that.index;
				var leng = that.$table.length;
				
			    for (var i = 0; i < leng; i++) {
			    	var tempArray = [];
			    	var ColumnNumber = that.$table.eq(i).children().length;
			    	for (var j = 0; j < ColumnNumber; j++) {
			    		tempArray.push(that.$table[i].children[j].innerHTML);
			    	}
				    that.sorterArray[i] = tempArray;
				}
		        that.$tableHead = $(this);
				that.sortByArray();
				that.changeThePosition();
			})
		}

		
		sorterProto.sortByArray = function() {
			
			if(!(this.$tableHead.val()==1)) {
		 		this.$tableHead.val(1);
		 		this.$tableHead.addClass("descend");
		 		if (!this.allNumber()) {
					this.sorterArray.sort(this.DownStringSort);
				} else {
			    	this.sorterArray.sort(this.DownsortNumber);
				}
		 	} else {
		 		this.$tableHead.val(0);
		 		this.$tableHead.addClass("ascend");
		 		if (!this.allNumber()) {
					this.sorterArray.sort(this.UpStringSort);
				} else {
			    	this.sorterArray.sort(this.UpsortNumber);
				}
		 	}
		 	
		}

		sorterProto.UpsortNumber = function(a, b) {
            return a[indexs] - b[indexs];
            console.log(a[indexs], b[indexs]);
        }
        sorterProto.DownsortNumber = function(a, b) {
            return b[indexs] - a[indexs];
        }
        
        sorterProto.DownStringSort = function(a, b) {
    		if (a[indexs] > b[indexs]) return -1;
    		return 1;
        }
        sorterProto.UpStringSort = function(a, b) {
    		if (a[indexs] > b[indexs]) return 1;
    		return -1;
        }
		sorterProto.changeThePosition = function() {
			var leng = this.$table.length;
		    for (var i = 0; i < leng; i++) {
		    	var ColumnNumber = this.$table.eq(i).children().length;
		    	for (var j = 0; j < ColumnNumber; j++) {
		    		$(this.$table[i].children[j]).html(this.sorterArray[i][j]);
		    	}
			}

	    }
	    sorterProto.allNumber = function() {
	    	for (var k = 0; k < this.sorterArray.length; k++) {
	    		if (isNaN(this.sorterArray[k][indexs])) return false;
	    	}
	    	return true;
	    }
	    sorterProto.clear = function() {
			$("th").each(function() {
				if ($(this).closest("th").hasClass("ascend")) {
					$(this).closest("th").removeClass("ascend");
				}
				if ($(this).closest("th").hasClass("descend")) {
					$(this).closest("th").removeClass("descend");
				}
			});
		}
		
	    Sorter();
		
	



