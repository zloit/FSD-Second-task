// Masked date field

jQuery(function($){
	$('#date-input').mask('99.99.9999');
});


// Date picker

import './src/datepicker';

if ($('#date-filter').length) {

	let $dateFilter = $('#date-filter');

	$dateFilter.datepicker({
		mask: 'Диапазон',
		range: true,
		multipleDatesSeparator: " — ",
		startDate: new Date(2019, 7),
		dateFormat: "dd M",
		clearButton: true,
		onRenderCell: function(date,cellType) {
			return {html: '<span>'+date.getDate()+'</span>'}
		}
	});

	$dateFilter.datepicker().data('datepicker').update();

}

if (($('#date-picker-start').length)||($('#date-picker-end').length)) {
	
	let $start = $('#date-picker-start');
	let $end = $('#date-picker-end')

	$start.datepicker({
		rangeEnd: $end,
		range: true,
		// inline: true,
		clearButton: true,
		onSelect: function (fd) {
			const date = fd.split(',');
			if (date[0] != '') {
				$start.val(date[0]);
				if (date.length > 1) 
					$end.val(date[1]);
			}
		}
	});
	
	$start.datepicker().data('datepicker').update();
	
	$end.click(function(){
		$start.datepicker().data('datepicker').show();
	  });
}

if (($('#date-picker2-start').length)||($('#date-picker2-end').length)) {
	
	let $start = $('#date-picker2-start');
	let $end = $('#date-picker2-end')

	$start.datepicker({
		rangeEnd: $end,
		range: true,
		// inline: true,
		clearButton: true,
		// startDate: new Date(2019,8,19),
		onSelect: function (fd) {
			const date = fd.split(',');
			if (date[0] != '') {
				$start.val(date[0]);
				if (date.length > 1) 
					$end.val(date[1]);
			}
		}
	});
	
	
	$start.datepicker().data('datepicker').update();
	
	$start.val('19.08.2019');
	$end.val('23.08.2019');
	
	$end.click(function(){
		$start.datepicker().data('datepicker').show();
	  });
}
