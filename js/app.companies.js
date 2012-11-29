App.companies = [
	{	
		name : 'Taxi Stockholm',
		updated : '2012-11-29',
		prices : {
			1 : {
				start : 45,
				km : 11,
				h : 545,
				text: 'Må-fre kl 07-09. Mån-fre kl 15-19 (ej helgdag och helgdagsafton).'
			},
			2 : {
				start : 45,
				km : 9.20,
				h : 445,
				text : 'Mån-fre kl 09-15 (ej helgdag och helgdagsafton).'
			},
			3 : {
				start : 45,
				km : 11,
				h : 500,
				text : 'Mån-fre kl 00-07. Mån-tor kl 19-24. Fre kl 19-21. Lör kl 05-21. Sön kl 05-24. Röda dagar och helgdagsaftnar som ej är specificerade nedan.'
			},
			4 : {
				start : 45,
				km : 13.60,
				h : 575,
				text : 'Fre kl 21-lör kl 05. Lör kl 21- sön kl 05. Valborgsmässoafton, midsommarafton, nyårsafton kl 15 till 24 nästa dag samt julafton kl 00 till annandag jul kl 24.'
			}
		},
		tariff: function(){
			var d = new Date(),
				n = d.getDay(),
				h = d.getHours(),
				tariff = 1;

			if ( n > 0 && n < 5 ) {
				// Monday - Thursday
				if ( h >= 9 && h < 15 ) {
					tariff = 2;
				} else if ( ( h >= 0 && h < 7 ) || ( h >= 19 && h <= 23 ) ) {
					tariff = 3;
				}
			} else if ( n == 5 ) {
				// Fridays
				if ( h >= 7 && h < 15 ) {
					tariff = 2;
				} else if ( ( h >= 0 && h < 7 ) || ( h >= 19 && h < 21 ) ) {
					tariff = 3;
				} else if ( h >= 21 ) {
					tariff = 4;
				}
			} else if ( n == 6 ) {
				// Saturdays
				if ( h >= 5 && h < 21 ) {
					tariff = 3;
				} else if ( ( h >= 0 && h < 5 ) || ( h >= 21 ) ) {
					tariff = 4;
				}
			} else if ( n == 0 ) {
				// Sundays
				if ( h >= 5 && h <= 23 ) {
					tariff = 3;
				} else if ( h >= 0 && h < 5 ) {
					tariff = 4;
				}
			}

			return tariff;
		}
	},
	{	
		name : 'Taxi 020',
		updated : '2012-11-29',
		prices : {
			1 : {
				start : 39,
				km : 9.6,
				h : 457,
				text: 'Helgfri mån – fre 09 – 15'
			},
			2 : {
				start : 39,
				km : 10.9,
				h : 473,
				text : 'Övrig tid som ej omfattas av tariff 1 eller 3'
			},
			3 : {
				start : 39,
				km : 12.5,
				h : 569,
				text : 'Fre kl 19 – lör kl 06, lör kl 19 – sön kl 06 samt julafton kl 00 till annandag jul kl 24. Nyårsafton, midsommarafton och valborgsmässoafton kl 15 till kl 24 nästa dag.'
			}
		},
		tariff: function(){
			var d = new Date(),
				n = d.getDay(),
				h = d.getHours(),
				tariff = 2;

			if ( n > 0 && n < 5 ) {
				// Monday - Thursday
				if ( h >= 9 && h < 15 ) {
					tariff = 1;
				}
			} else if ( n == 5 ) {
				// Fridays
				if ( h >= 9 && h < 15 ) {
					tariff = 1;
				} else if ( h >= 19 ) {
					tariff = 3;
				}
			} else if ( n == 6 ) {
				// Saturdays
				if ( h < 6 || h >= 19 ) {
					tariff = 3;
				}
			} else if ( n == 0 ) {
				// Sundays
				if ( h < 6 ) {
					tariff = 3;
				}
			}

			return tariff;
		}
	}
];