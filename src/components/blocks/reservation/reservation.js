if (document.getElementById('reservation')) {
    const reservation = document.getElementById('reservation');
    const services = reservation.getElementsByClassName('services')[0];
    const roomPrice = +reservation.getElementsByClassName('reservation__price')[0].innerHTML.replace('₽','').replace(' ','');
    const totalPriceDiv = reservation.getElementsByClassName('services__total-price')[0];

    let reservationService = document.createElement('div');
    let reservationName = document.createElement('p');
    let reservationPrice = document.createElement('span');

    reservationService.className = "services__service";
    reservationName.className = "services__name";
    reservationPrice.className = "services__price";
    reservationService.prepend(reservationPrice);
    reservationService.prepend(reservationName);
    
    updateDisplay();

    function updateDisplay() {
        const date1 = new Date((reservation.getElementsByClassName('date-picker')[0].value).replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
        const date2 = new Date((reservation.getElementsByClassName('date-picker')[1].value).replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
        
        const range = ((date2 - date1) / (1000*60*60*24));
        
        if (range > 0) {
            reservationName.innerHTML = roomPrice + "₽ x " + range + " суток";
            reservationPrice.innerHTML = roomPrice*range;
            services.prepend(reservationService);
        }

        const prices = services.getElementsByClassName('services__price');
        let totalPrice = 0;   

        for (let i = 0; i < prices.length; i++) {
            totalPrice += +prices[i].innerHTML;
        }

        totalPriceDiv.innerHTML = totalPrice;



        


        // console.log(new Date(('09.08.2019').replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1')));
    }
}