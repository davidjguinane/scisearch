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
       $('#message').css( "display", "none" );
   }

   function end_loader() {
       $('.loadbar').css( "display", "none" );
   }

   	function select_option() {
		$('select option').removeClass("selected")
		$('select option.selected').removeClass("selected")		
	}

	function parseFacilityResults(resultsList) {
		if (resultsList == 0) {
			$('#data_results').append(
					"No results"					
				)
		} else {
		$.each(resultsList, function(key, value){
			//console.log(value)
			var resultKey = key + 1
			var resultName = value["Centre name"]
			//console.log(resultName)
			var resultSummary = value["Centre summary"]
			var resultImage = value["Centre image"]
			//console.log(resultSummary)
			var resultSectors = value["Sectors"]
			if(resultSectors.indexOf($name) !== -1) {
				$('#data_results').append(
					"<div class=\"demo-card-wide mdl-card mdl-shadow--4dp\">" +
					  "<div class=\"mdl-card__title\">" +
					    "<h2 class=\"mdl-card__title-text\">" + resultName + "</h2>" +
					  "</div>" +
					  "<div class=\"mdl-card__supporting-text\">" +
					    resultSummary +
					  "</div>" +
					  "<div class=\"mdl-card__actions mdl-card--border\">" +
					    "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" href=\"/" + resultKey + "\" >" +
					      "Explore" +
					    "</a>" +
					  "</div>" +
					"</div>"
				)} else {

				}				
			})		
		}
	}

	function parseEquipmentResults(resultsList) {
		if (resultsList == 0) {
			$('#data_results').append(
					"No results"					
				)
		} else {
		$.each(resultsList, function(key, value){
			//console.log(value)
			var resultKey = key + 1
			var resultName = value["Centre name"]
			//console.log(resultName)
			var resultSummary = value["Centre summary"]
			var resultImage = value["Centre image"]
			//console.log(resultSummary)
			var resultFacilities = value["Facilities and major equipment"]
			if(resultFacilities.indexOf($name) !== -1) {
				$('#data_results').append(
					"<div class=\"demo-card-wide mdl-card mdl-shadow--4dp\">" +
					  "<div class=\"mdl-card__title\">" +
					    "<h2 class=\"mdl-card__title-text\">" + resultName + "</h2>" +
					  "</div>" +
					  "<div class=\"mdl-card__supporting-text\">" +
					    resultSummary +
					  "</div>" +
					  "<div class=\"mdl-card__actions mdl-card--border\">" +
					    "<a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" href=\"/" + resultKey + "\" >" +
					      "Explore" +
					    "</a>" +
					  "</div>" +
					"</div>"
				)} else {

				}				
			})		
		}
	}

	function request_data($name) {
		$.ajax({
			type: "POST",
			url: '/select_sector/',
            data: { 
                'sector' : $name,
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
				var sectorArray = [
					'Advanced manufacturing',
					'Biotechnology',
					'Defence',
					'Aviation and space',
					'Engineering',
					'Energy',
					'Environment and nature',
					'Food and agriculture',
					'Health and medical',
					'Life sciences',
					'Mining/resources',
					'ICT and multimedia',
					'Social sciences',
					'Transport',
					'Tropical'
				];
				if(sectorArray.indexOf($name) !== -1) {
					parseFacilityResults(resultsList)
				} else {
					parseEquipmentResults(resultsList)
				}
	        }
            })
            return false    
		}

	function clearList() {
		$('#data_results').html('')
	}

	$(document).on('change', '#sector_selection, option:selected', function() {
		clearList()
		select_option()
		$name = $('select#sector_selection option:selected').attr('value')
		console.log($name)
		request_data($name)
	});

	$(document).on('change', '#equipment_selection, option:selected', function() {
		clearList()
		select_option()
		$name = $('select#equipment_selection option:selected').attr('value')
		request_data($name)
	});

/*
	$('#sector_selection').change(function(e){
		e.preventDefault()
		clearList()
		select_sector()
		select_equipment()

	})

	$('#equipment_selection').change(function(e){
		e.preventDefault()
		clearList()
		select_sector()
		select_equipment()
		$('select#equipment_selection, option:selected').addClass("selected")

	}) */
	      
})