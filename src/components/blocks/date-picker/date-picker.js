// Masked date field

jQuery(function($){
	$('#date-input').mask('99.99.9999');
});


// Date picker

import './src/datepicker';

let $dateFilter = $('#date-filter')

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

let $start = $('#date-picker-start');
let $end = $('#date-picker-end')

if (($start != undefined)||($end != undefined)) {
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

