// https://github.com/reservamos/item-quantity-dropdown

(function ($) {
    const defaults = {
      maxItems: Infinity,
      minItems: 0,
      controls: {
        position: 'right',
        displayCls: 'dropdown__content',
        controlsCls: 'dropdown__controls',
        counterCls: 'dropdown__counter',
      },
      items: {},
      onChange: () => {},
      beforeDecrement: () => true,
      beforeIncrement: () => true,
    };
  
    $.fn.dropdown = function (options) {
      this.each(function () {
        const $this = $(this);
        const $selection = $this.find('p.dropdown__selection').last();
        const $menu = $this.find('div.dropdown__menu');
        const $items = $menu.find('div.dropdown__option');
        const settings = $.extend(true, {}, defaults, options);
        const itemCount = {};
        let totalItems = 0;
  
        function updateDisplay () {
          let forms = 'гость,гостя,гостей'.split(',');
          let x10 = totalItems % 10, x100 = totalItems % 100, form = 2 // гостей
          if (x10 == 1 && x100 != 11)
            form = 0 // гость
          else if (x10 > 1 && x10 < 5 && (x100 < 10 || x100 > 21))
            form = 1 // гостя
          $selection.html(`${totalItems} ${forms[form]}`);
        }
  
        function setItemSettings (id, $item) {
          const minCount = Number($item.data('mincount'));
          const maxCount = Number($item.data('maxcount'));
  
          settings.items[id] = {
            minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
            maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
          };
        }
  
        function addControls (id, $item) {
          const $controls = $('<div />').addClass(settings.controls.controlsCls);
          const $decrementButton = $(`
            <button class="dropdown__btn-decrement dropdown__forbid">-</button>
          `);
          const $incrementButton = $(`
            <button class="dropdown__btn-increment">+</i>
            </button>
          `);
          const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);
  
          $item.children('div').addClass(settings.controls.displayCls);
          $controls.append($decrementButton, $counter, $incrementButton);
  
          if (settings.controls.position === 'right') {
            $item.append($controls);
          } else {
            $item.prepend($controls);
          }
  
          $decrementButton.click((event) => {
            const { items, minItems, beforeDecrement, onChange } = settings;
            const allowClick = beforeDecrement(id, itemCount);
  
            if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
              itemCount[id] -= 1;
              totalItems -= 1;
              $counter.html(itemCount[id]);
              updateDisplay();
              onChange(id, itemCount[id], totalItems);
              if (itemCount[id] == 0) {
                $decrementButton.addClass('dropdown__forbid');
              }
            }
            
            event.preventDefault();
          });
  
          $incrementButton.click((event) => {
            const { items, maxItems, beforeIncrement, onChange } = settings;
            const allowClick = beforeIncrement(id, itemCount);

            if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
              itemCount[id] += 1;
              totalItems += 1;
              $counter.html(itemCount[id]);
              updateDisplay();
              onChange(id, itemCount[id], totalItems);
              if (itemCount[id] > 0) {
                $decrementButton.removeClass('dropdown__forbid');
              }
            }
  
            event.preventDefault();
          });
  
          $item.click(event => event.stopPropagation());
  
          return $item;
        }
  
        $this.click(() => {
          $this.toggleClass('dropdown__menu-open');
        });
  
        $items.each(function () {
          const $item = $(this);
          const id = $item.data('id');
          const defaultCount = Number($item.data('defaultcount') || '0');
  
          itemCount[id] = defaultCount;
          totalItems += defaultCount;
          setItemSettings(id, $item);
          addControls(id, $item);
        });
  
        //updateDisplay();
      });
  
      return this;
    };
  }(jQuery));

$(document).ready(() => {
    $('.dropdown').dropdown({
    });
  });