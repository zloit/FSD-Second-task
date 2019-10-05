document.addEventListener('click', function(event) {
    
    if (event.target.closest('div').dataset.checkboxlist != undefined) { // если есть атрибут...
      let head = event.target.closest('div');
      let body =  head.nextElementSibling;
  
      body.classList.toggle("expand-checklist__list_expand");
      }

});