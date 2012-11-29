<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Kåkentaxi</title>
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&amp;sensor=true"></script>
	<link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.1/css/bootstrap.min.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
</head>
<body>
	<h1>Kåkentaxi</h1>
	<form id="taxi-form">
		<label class="radio"><input type="radio" name="type" value="from" checked="checked"> Från Kåken till:</label>
		<div id="field-from">
			<input type="text" name="address_from">
		</div>
		<label class="radio"><input type="radio" name="type" value="to"> Till Kåken från:</label>
		<div id="field-to" class="hidden">
			<input type="text" name="address_to">
		</div>
		<label>Taxibolag<br>
			<select id="company"></select>
		</label>

		<button id="calculate" class="btn btn-primary" type="submit">Räkna ut</button>
	</form>
	<hr>

	<h2 class="hidden">Pris: <span id="price"></span></h2>

	<div id="alternatives-wrap" class="hidden">
		<h3>Valbara rutter</h3>
		<select id="alternatives"></select>
	</div>

	<h3>Aktuell tariff: <span id="tariff"></span></h3>

	<table id="price-table" class="table table-striped"></table>

	<script src="js/app.js"></script>
	<script src="js/app.companies.js"></script>
</body>
</html>