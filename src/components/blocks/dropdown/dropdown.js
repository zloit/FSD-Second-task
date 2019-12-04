(function () {

  function i18n(forms,count) {
      let x10 = count % 10, 
          x100 = count % 100, 
          form = 2 // гостей
      if (x10 == 1 && x100 != 11)
        form = 0; // гость
      else if (x10 > 1 && x10 < 5 && (x100 < 10 || x100 > 21))
        form = 1; // гостя
      return forms[form];
  }

  function updateDisplay(elem) {
    const dropdown = elem.closest('div.dropdown');
    const selection = dropdown.getElementsByClassName('dropdown__selection')[0];
    const option = dropdown.getElementsByClassName('dropdown__option');
    if (dropdown.dataset.display == 'summation') { // Для суммы
      let totalItems=0;
      for (let i = 0; i < option.length; i++) {
        totalItems += +option[i].getElementsByClassName('dropdown__counter')[0].innerHTML;
      }

      const forms = ['гость','гостя','гостей'];

      if (totalItems != 0) {
        selection.innerHTML = `${totalItems} ${i18n(forms,totalItems)}`;
      } else {
        selection.innerHTML = "Сколько гостей";
      }
    } else if (dropdown.dataset.display == 'listing') {  // Для перечисление
      const forms = [
        ['спальня','спальни','спален'],
        ['кровать','кровати','кроватей'],
        ['ванная комната','ванные комнаты','ванных комнат']
      ]
      let items = [];
      for (let i = 0; i < option.length; i++) {
        const count = +option[i].getElementsByClassName('dropdown__counter')[0].innerHTML;
        if (count != 0) items.push(`${count} ${i18n(forms[i],count)}`);
      }

      switch (items.length) {
        case 0:
          selection.innerHTML = 'Какие удобства';
          break;
        case 1:
          selection.innerHTML = items[0];
          break;
        case 2:
          selection.innerHTML = items[0] + ", " + items[1];
          break;
        case 3:
          selection.innerHTML = items[0] + ", " + items[1] + "..."
          break;
      }
    }
  }
  


  document.addEventListener('click', function(event) {

    // Open & Close
    if (event.target.closest('div').dataset.display != undefined) {
      event.target.closest('div').classList.toggle('dropdown__menu-open');
      return;
    }
    // Decrement
    if (event.target.closest('span.dropdown__btn-decrement') != undefined) {
      const btn = event.target.closest('span.dropdown__btn-decrement');
      const count = btn.nextElementSibling;
      if (count.innerHTML>1) {
        count.innerHTML = +count.innerHTML - 1;
      } else if (count.innerHTML==1) {
        count.innerHTML = +count.innerHTML - 1;
        btn.classList.add('dropdown__forbid')
      }
      updateDisplay(event.target);
      return;
    }
    // Increment
    if (event.target.closest('span.dropdown__btn-increment') != undefined) {
      const count = event.target.previousSibling;
      const btn = count.previousSibling;
      if (count.innerHTML==0) {
        btn.classList.remove('dropdown__forbid');
      } 
      count.innerHTML = +count.innerHTML + 1;
      updateDisplay(event.target);
      return;
    }
    // Применить
    if (event.target.closest('span.dropdown__apply') != undefined) {
      event.target.closest('div.dropdown').classList.toggle('dropdown__menu-open');
    }
    // Очистить
    if (event.target.closest('span.dropdown__clear') != undefined) {
      
      const option = event.target.closest('div.dropdown').getElementsByClassName('dropdown__option');
      
      for (let i = 0; i < option.length; i++) {
        option[i].getElementsByClassName('dropdown__counter')[0].innerHTML = 0;
        option[i].getElementsByClassName('dropdown__btn-decrement')[0].classList.add('dropdown__forbid');
      }
      updateDisplay(event.target);
    }
  });

  jQuery(function($){
    $(document).mouseup(function (e){ // событие клика по веб-документу
      var div = $(".dropdown"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
          && div.has(e.target).length === 0) { // и не по его дочерним элементам
        div.removeClass('dropdown__menu-open'); // скрываем его
      }
    });
  });

}())
