$(document).ready(function() { // Ждём загрузки страницы
						   
	var sliders = $(".room-slider");

	var width = $(".room-slider__slides").width(); // Получаем ширину видимой области (одинакова для всех слайдеров в проекте => вне цикла)

	for (let n = 0; n < sliders.length; n++) {

		let slides = $(sliders[n]).find(".room-slider__slide"); // Получаем массив всех слайдов
		
		let i = slides.length; // Получаем количество слайдов
		let offset = i * width; // Задаем начальное смещение и ширину всех слайдов
		let cheki = i-1;
		
		$(sliders[n]).children(".room-slider__slides").css('width',offset); // Задаем блоку со слайдами ширину всех слайдов
		
		for (j=0; j < slides.length; j++) {
			if (j==0) {
				$(sliders[n]).children(".room-slider__nav").append("<div class='dot active'></div>");
			}
			else {
				$(sliders[n]).children(".room-slider__nav").append("<div class='dot'></div>");
			}
		}
		
		let dots = $(sliders[n]).find(".dot");

		offset = 0; // Обнуляем смещение, так как показывается начала 1 слайд
		i = 0; // Обнуляем номер текущего слайда
		
		$(sliders[n]).find('.room-slider__nav .dot').click(function(){
			$(sliders[n]).find('.room-slider__nav .active').removeClass("active");								  
			$(this).addClass("active");
			i = $(this).index();
			offset = i * width;
			$(sliders[n]).children(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
		});
		
		
		$(sliders[n]).find('.room-slider__next').click(function(){	// Событие клика на кнопку "следующий слайд"
			if (offset < width * cheki) {	// Проверяем, дошли ли мы до конца
				offset += width; // Увеличиваем смещение до следующего слайда
				$(sliders[n]).children(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
				$(sliders[n]).find('.room-slider__nav .active').removeClass("active");	
				$(dots[++i]).addClass("active");
			}
		});


		$(sliders[n]).find('.room-slider__prev').click(function(){	// Событие клика на кнопку "предыдущий слайд"
			if (offset > 0) { // Проверяем, дошли ли мы до конца
				offset -= width; // Уменьшаем смещение до предыдущегоо слайда
				$(sliders[n]).children(".room-slider__slides").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к предыдущему
				$(sliders[n]).find('.room-slider__nav .active').removeClass("active");	
				$(dots[--i]).addClass("active");
			}
		});
		
	}

});