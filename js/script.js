

window.onload = function() {

  	initMap();

  	// Evento scroll
	$(window).on('scroll', function() {
	  // comprimir menu
	  if ($(window).width() > 640) {
	    if ($(this).scrollTop() > 0) {
	      $('header.topo').addClass('sticky')
	    } else {
	      $('header.topo').removeClass('sticky')
	    }
	  }
	})

	// Click accordion
	$('.btn-accordion').on('click', function() {
		$('.list-text > li > article > div.article').hide()
		//$('.list-text > li').removeClass('active')

		var elem = $(this).closest('li')
		var n = $(elem).index()
		var li = $('.list-text > li:eq('+ n + ')')

		if ($(li).hasClass('active')) {
			$('.list-text > li:eq('+ n + ')  > article > div.article').hide()
			$(li).removeClass('active')
		} else {
			$('.list-text > li:eq('+ n + ')  > article > div.article').show()
			$(li).addClass('active')
		}
	})

	var dots = false;
	var arrows = true;
	if ($(window).width() < 768) {
		dots = true;
		arrows = false;
	}

	$('.carousel').flickity({
		cellSelector: '.carousel-cell',
		pageDots: dots,
		prevNextButtons: arrows,
		wrapAround: true
	});
};

var geocoder;
var mapa;
var marcador;

function initMap() {

	var lat = "-19.941723";
	var long = "-43.935110";

	var latlng = new google.maps.LatLng(parseFloat(lat),parseFloat(long));

	var opcoesMapa = {
		zoom: 12,
		center: latlng,
		scrollwheel: false,
		mapTypeControl: false,
		panControl: false,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_TOP
		},
		scaleControl: false,
		streetViewControl: true,
		streetViewControlOptions: {
		position: google.maps.ControlPosition.RIGHT_TOP
		},
		mapTypeControlypeId: google.maps.MapTypeId.ROADMAP
	};

	mapa = new google.maps.Map(document.getElementById("mapa"), opcoesMapa);

	geocoder = new google.maps.Geocoder();

	//Marcador
	//var icone = "image/marcador.png";
	marcador = new google.maps.Marker({
		position: new google.maps.LatLng(lat,long),
		map: mapa,
		draggable: false,
		animation: google.maps.Animation.DROP
		//icon: icone
	});

	//marcador.setPosition(latlng);
	mapa.setCenter(latlng);

	return true;

}

function findRoute() {

	if (document.getElementById("origem").value.trim() != "") {

		var directionsDisplay; 
		// Instanciaremos ele mais tarde, que será o nosso google.maps.DirectionsRenderer
		var directionsService = new google.maps.DirectionsService();
		 
		var origem = document.getElementById("origem").value;
		var destino = "Rua Lavras, 225 - São Pedro, Belo Horzonte - MG";

		var directionsDisplay = new google.maps.DirectionsRenderer();

	    var request = {
	        origin: origem,
	        destination: marcador.position,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    };

	    directionsService.route(request, function(response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	            directionsDisplay.setMap(mapa);
	        }
	    });

		directionsDisplay.setMap(mapa);
		directionsDisplay.setPanel(document.getElementById("info"));
		//document.getElementById('info').style.display='block';
	}
}