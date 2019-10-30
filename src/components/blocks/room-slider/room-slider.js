$(document).ready(function() { // Ждём загрузки страницы
						   
	var slides = $(".room-slider__slides").children(".room-slider__slide"); // Получаем массив всех слайдов
	var width = $(".room-slider__slides").width(); // Получаем ширину видимой области
	var i = slides.length; // Получаем количество слайдов
	var offset = i * width; // Задаем начальное смещение и ширину всех слайдов
	var cheki = i-1;
	
	$(".room-slider__slides").css('width',offset); // Задаем блоку со слайдами ширину всех слайдов
	
	for (j=0; j < slides.length; j++) {
		if (j==0) {
			$(".room-slider__nav").append("<div class='dot active'></div>");
		}
		else {
			$(".room-slider__nav").append("<div class='dot'></div>");
		}
	}
	
	var dots = $(".room-slider__nav").children(".dot");
	offset = 0; // Обнуляем смещение, так как показывается начала 1 слайд
	i = 0; // Обнуляем номер текущего слайда
	
	$('.room-slider__nav .dot').click(function(){
		$(".room-slider__nav .active").removeClass("active");								  
		$(this).addClass("active");
		i = $(this).index();
		offset = i * width;
		$(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
	});
	
	
	$(".room-slider__next").click(function(){	// Событие клика на кнопку "следующий слайд"
		if (offset < width * cheki) {	// Проверяем, дошли ли мы до конца
			offset += width; // Увеличиваем смещение до следующего слайда
			$(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
			$(".room-slider__nav .active").removeClass("active");	
			$(dots[++i]).addClass("active");
		}
	});


	$(".room-slider__prev").click(function(){	// Событие клика на кнопку "предыдущий слайд"
		if (offset > 0) { // Проверяем, дошли ли мы до конца
			offset -= width; // Уменьшаем смещение до предыдущегоо слайда
			$(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к предыдущему
			$(".room-slider__nav .active").removeClass("active");	
			$(dots[--i]).addClass("active");
		}
	});

});