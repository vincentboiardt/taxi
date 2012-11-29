var App = {
	directions: new google.maps.DirectionsService(),
	init: function() {
		App.list = $('#company');
		App.price = $('#price');
		App.table = $('#price-table');
		App.tariff = $('#tariff');
		App.alternativesWrap = $('#alternatives-wrap');
		App.alternatives = $('#alternatives');
		
		for (var i = 0; i < App.companies.length; i++) {
			var obj = App.companies[i];
			App.list.append('<option value="' + i + '">' + obj.name + '</option>' );
		}
		
		$('#calculate').on('click', App.getRoutes);

		$('input[name=type]').on('change', App.toggleFields);

		$('#taxi-form').on('submit', App.getRoutes);

		App.list.on('change', App.calculateAlternative);
		App.alternatives.on('change', App.calculateAlternative);

		App.drawPriceInfo();
	},
	drawPriceInfo: function() {
		var index = App.list.val(),
			prices = App.companies[index].prices,
			updated = App.companies[index].updated,
			tariff = App.companies[index].tariff();
		
		App.tariff.text(tariff);

		App.table.empty();
		App.table.append('<tr><td>Tariff</td><td>Grundavgift</td><td>Kr/Km</td><td>Kr/Timme</td><td>Beskrivning</td><td></tr>' );
		
		$.each(prices, function(key){
			App.table.append('<tr><td>' + key + '</td><td>' + this.start + ' kr</td><td>' + this.km + ' kr</td><td>' + this.h + ' kr</td><td>' + this.text + '</td><td></tr>' );
		});
		
		App.table.append('<tr><td colspan="5">Uppdaterad: ' + updated + '</td></tr>');
	},
	getRoutes: function(e) {
		e.preventDefault();
		
		var type = $('input[name=type]:checked').val(),
			address = $('input[name=address_' + type + ']').val(),
			home = 'Regeringsgatan 66, Stockholm, Sweden',
			req = {
				travelMode: google.maps.DirectionsTravelMode.DRIVING,
				provideRouteAlternatives: true
			};

		App.drawPriceInfo();

		if ( type == 'from' ) {
			req.origin = home;
			req.destination = address;
		} else {
			req.origin = address;
			req.destination = home;
		}

		console.log(req);

		App.directions.route(req, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var bestRoute = response.routes[0];
				
				App.calculate(bestRoute.legs[0].distance.value, bestRoute.legs[0].duration.value);
				
				console.log(response);

				if ( response.routes.length > 1 ) {
					App.routes = response.routes;
					App.alternativesWrap.show();
					App.alternatives.empty();
					for (var i = 0; i < response.routes.length; i++) {
						var r = response.routes[i];

						App.alternatives.append('<option value="' + i + '">' + r.summary + ' - ' + r.legs[0].distance.text + ', ' + r.legs[0].duration.text + '</option>');
					}
				} else {
					App.routes = false;
					App.alternativesWrap.hide();
				}
			}
		});
	},
	calculate: function( distance, time ) {
		var index = App.list.val(),
			tariff = App.companies[index].tariff(),
			priceObj = App.companies[index].prices[tariff],
			price = Math.round( priceObj.start + ( priceObj.km * ( distance / 1000 ) ) + ( ( priceObj.h / 60 / 60 ) * time ) );

		App.price.text(price + ' kr').parent().show();
	},
	calculateAlternative: function() {
		var index = App.alternatives.val(),
			route = App.routes[index];

		App.calculate(route.legs[0].distance.value, route.legs[0].duration.value);
	},
	toggleFields: function() {
		var type = $(this).val();

		if ( type == 'from' ) {
			$('#field-from').show();
			$('#field-to').hide();
		} else {
			$('#field-from').hide();
			$('#field-to').show();
		}
	}
};
$(document).ready(App.init);