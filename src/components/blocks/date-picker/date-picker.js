// Masked date field
jQuery(function($){
	$('#date-input').mask('99.99.9999');
});

// Date picker
import './src/datepicker';

$('#date-picker-start').datepicker({
	range: true
});