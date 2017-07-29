$( document ).ready(function() {
	console.log('ready')

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    } 

    var csrftoken = getCookie("csrftoken")

    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });

   function start_loader() {
       $('.loadbar').css( "display", "block" );
   }

   function end_loader() {
       $('.loadbar').css( "display", "none" );
   }

   	function select_sector() {
		$('select#sector_selection, option:selected').change(function(e){
			$('#primary_category, option').removeClass("selected")
		});			
	}

	function parseResults(resultsList) {
		if (resultsList == 0) {
			$('#data_results').append(
					"No results"					
				)
		} else {
		$.each(resultsList, function(key, value){
			console.log(key)
			console.log(value)
			var resultName = value["Centre name"]
			//console.log(resultName)
			var resultSummary = value["Centre summary"]
			//console.log(resultSummary)
			var resultSectors = value["Sectors"]
			if(resultSectors.indexOf($sector_name) !== -1) {
				$('#data_results').append(
					"<div class=\"demo-card-wide mdl-card mdl-shadow--2dp\">" +
					  "<div class=\"mdl-card__title\">" +
					    "<h2 class=\"mdl-card__title-text\">" + resultName + "</h2>" +
					  "</div>" +
					  "<div class=\"mdl-card__supporting-text\">" +
					    resultSummary +
					  "</div>" +
					  "<div class=\"mdl-card__actions mdl-card--border\">" +
					    "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">" +
					      "Explore" +
					    "</a>" +
					  "</div>" +
					"</div>"
				)} else {

				}				
			})		
		}
	}

	function request_data() {
		$.ajax({
			type: "POST",
			url: '/select_sector/',
            data: { 
                'sector' : $sector_name,
                'csrfmiddlewaretoken': csrftoken,
            },
            beforeSend: function(xhrObj){
                start_loader()
            },
			success: function(data){
				end_loader();
				result = JSON.parse(data)
				var resultsList = []
				resultsList = result['result']['records']
				parseResults(resultsList)
	        }
            })
            return false    
		}

	function clearList() {
		$('#data_results').html('')
	}

	$('#sector_selection').change(function(e){
		e.preventDefault()
		clearList()
		select_sector()
		$('select#sector_selection, option:selected').addClass("selected")
        $sector_name = $('option.selected').attr('value')
        console.log($sector_name)
		request_data()
	})
	      
})