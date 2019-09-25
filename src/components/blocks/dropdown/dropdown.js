(function ($) {
    const defaults = {
      maxItems: Infinity,
      minItems: 0,
      selectionText: 'item',
      textPlural: 'items',
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
          const usePlural = totalItems !== 1 && settings.textPlural.length > 0;
          const text = usePlural ? settings.textPlural : settings.selectionText;
          $selection.html(`${totalItems} ${text}`);
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
            <button class="dropdown__btn-decrement">-</button>
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