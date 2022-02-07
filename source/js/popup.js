'use strick'

//Функция вызова popup.
function showModalWindow (button, hash=false) { //Параметр hash используем в true, если popup вызывается сразу с известным названием id, а не забирается из атрибута
    const popupName = hash ? button : button.attr('data-popup-name');
    const popup = $(`#${popupName}`);
    const popupClose = popup.find('.popup__close');
    const popupActive = $('.popup.popup--active');

    //Проверяем, есть ли уже открыте popup и если да, то закрываем его
    if (popupActive.length) {
        closeModalWindow(popupActive, false);
    } else {
        blockBody();
    }

    //Открываем popup
    popup.addClass('popup--active');

    //Закрытие popup на крестик
    popupClose.on('click', function () {
        closeModalWindow(popup);
    })

    //Закрытие popup при клике на темную область
    popup.on('mousedown', function (e) {
        if (!e.target.closest('.popup__content')) {
            closeModalWindow(popup);
        }
    })

    //Закрытие popup при нажатии esc
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) {
            closeModalWindow(popup);
        }
    })
}

//Закрывает попап и удаляет обработчик прослушки нажатия клавиш клавиатуры
function closeModalWindow(popup, doUnBlockBody = true) {
    if (doUnBlockBody) {
        unBlockBody();
        popup.removeClass('popup--active');
        $(document).off('keydown');
    } else {
        popup.removeClass('popup--active');
    }
}

//Блокируем body с удалением скролла
function blockBody() {
    const body = document.body;
    const blockPaddingValue = window.innerWidth - body.clientWidth + 'px';

    body.style.overflow = 'hidden';
    body.style.paddingRight = blockPaddingValue;
}

//Разблокирует body
function unBlockBody() {
    const body = document.body;

    //Разблокируем боди после окончания анимации
    setTimeout(function () {
        body.style.overflow = 'visible';
        body.style.paddingRight = '0';
    }, 500);
}

//Вызов popup у элемента с артибутом data-popup-name
$('[data-popup-name]').on('click', function () {
    const form = $(this).parents('.form')

    //Проверяем, если нужно проверить какую то форму при вызове popup. Кнопка вызова popup должна быть внутри формы. Пример на Авантаж онлайн, в калькудяторе
    if (form.length) {
        if (!validator(form)) {
            showModalWindow($(this));
        }
    } else {
        showModalWindow($(this));
    }
})

//Вызов popup по хэшу
if (window.location.hash.indexOf('#popup') >= 0) {

    const hashName = window.location.hash;
    const popupName = hashName.split(':').pop();

    showModalWindow (popupName, hash=true) //Используем hash=true что бы сразу прокинуть название popup, а не вытаскивать его из атрибута кнопки
}
