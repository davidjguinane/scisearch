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
       $('#loadbar').css( "display", "block" );
   }

   function end_loader() {
       $('#loadbar').css( "display", "none" );
   }

   	function select_sector() {
		$('select#sector_selection, option:selected').change(function(e){
			$('#primary_category, option').removeClass("selected")
		});			
	}

	function request_data() {
		$.ajax({
			type: "POST",
			url: '/select_sector/',
            data: { 
                'location' : newPathname,
                'csrfmiddlewaretoken': csrftoken,
            },
            beforeSend: function(xhrObj){
                start_loader()
            },
			success: function(data){
                console.log(data)
				end_loader();
				result = JSON.parse(data)
				// VARIABLES
	            }
            })
            return false    
		}

	$('#sector_selection').change(function(e){
		e.preventDefault()
		select_sector()
		$('select#sector_selection, option:selected').addClass("selected")
        $sector_name = $('option.selected').attr('value')
		request_data()
	})
	      
})