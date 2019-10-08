
document.addEventListener('click', function(event) {
    
    if (event.target.closest('div').dataset.counter != undefined) { // если есть атрибут...
        const likebtn1 = event.target.closest('div');
        const add = likebtn1.classList.contains('like-btn_liked') ? -1 : 1;
        let count = likebtn1.querySelector('.like-btn__count');
        count.innerHTML = +count.innerHTML + add;
        likebtn1.classList.toggle('like-btn_liked');
      }

});