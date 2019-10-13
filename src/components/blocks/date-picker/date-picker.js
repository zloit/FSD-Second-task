// Masked date field

jQuery(function($){
	$('#date-input').mask('99.99.9999');
});


// Date picker

import './src/datepicker';
	
	let $start = $('#date-picker-start');
	let $end = $('#date-picker-end')
	let $dateFilter = $('#date-filter')
	

$start.datepicker({
	rangeEnd: $end,
	range: true,
	// inline: true,
	clearButton: true,
	onRenderCell: function(date,cellType) {
		let item;
		switch (cellType) {
			case 'day':
				item = date.getDate();
				break;
			case 'month':
				item = date.getMonth()+1;
				break;
			case 'year':
				item = date.getFullYear();
				break;
		}
		return {html: '<span>'+item+'</span>'}
	},
	onSelect: function (fd) {
		const date = fd.split(',');
		if (date[0] != '') {
			$start.val(date[0]);
			if (date.length > 1) 
				$end.val(date[1]);
		}
	}
});

$end.click(function(){
	$start.datepicker().data('datepicker').show();
  });

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
$start.datepicker().data('datepicker').update();
