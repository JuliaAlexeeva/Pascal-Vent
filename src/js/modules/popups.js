/* ПОПАПЫ */

// Получаю все объекты с классом popup__link
const popupLinks = document.querySelectorAll('.popup__link');
// Получаем тег body, чтобы блокировать скролл внутри него, когда вылезает попап
const body = document.querySelector('body');
// Получаем все объекты (навешиваю класс на теге header)
const lockPadding = document.querySelectorAll('.lock-padding');

const header = document.querySelector('.header__huge-container');

// Данная переменная для того, чтобы не было двойных нажатий на попап, когда он ещё не закрылся/открылся
let unlock = true;

// Время анимации
const timeout = 800;

// Функция для определения координаты body при скролле к нужному попапу (для фиксации body на IOS)
function coordValuePopup() {
    const currentWindowCoord = body.getBoundingClientRect().top;
    return currentWindowCoord;
}

// Вешаем события на ссылки popup-link
// сперва делается проверка, есть ли они вообще 
if (popupLinks.length > 0) {
    // с помощью цикла все перебираем 
    for (let index = 0; index < popupLinks.length; index++) {
        // в переменную получаем каждую ссылку
        const popupLink = popupLinks[index];
        // навешиваем функцию при клике на каждую ссылку
        popupLink.addEventListener("click", function (e) {
            // в новую переменную получаем из ссылки атрибут
            // (#popup, например и убираем # и получаем чистое имя popup = название попапа)
            const popupName = popupLink.getAttribute('href').replace('#', '');
            // после получаем в переменную сам объект попапа, id=popup
            const currentPopup = document.getElementById(popupName);
            // полученный объект отправляется в функцию popupOpen (открытие попапа)
            popupOpen(currentPopup);
            // так как это ссылка, то этим свойством запрещаем перезагружать страницу
            e.preventDefault();
        });
    }
}

// Получаем объекты с таким классом
const popupCloseIcon = document.querySelectorAll('.close-popup');
// Проверка на наличие
if (popupCloseIcon.length > 0) {
    // перебор через цикл и выполнение кода ниже для каждого элемента
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        // нашевиваем обработчик и функцию
        el.addEventListener('click', function (e) {
            // в функцию popupClose отправляем объект, который является ближайшим родителем класса .popup
            // то есть скрипт пробежится вверх по дереву пока не найдет класс .popup - найдет и его будет закрывать
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

// Функция открытия попапа (получаем значение, которое передается выше)
function popupOpen(currentPopup) { // popup__search
    // Проверяем, есть ли такой объект и открыта ли переменная unlock (вверху открыта = true)
    if (currentPopup && unlock) {
        // И после сразу закрываем открытый попап
        // получаем объект popup с классом open
        const popupActive = document.querySelector('.popup.open');
        // и если он существует
        if (popupActive) {
            // то отправляем в функцию и закрываем
            popupClose(popupActive, false);
        } else {
            // если такого нет, то мы блокируем скрол для body (через функцию bodyLock)
            bodyLock(coordValuePopup());
        }

        // ! Кастомная обработка для нашего HEADER, так как когда убирается скролл, то и исчезает фон у плашки меню,
        // ! которая добавляется при скролле, поэтому делаем проверку        
        if (header.classList.contains('active-scroll')) {
            header.classList.add('active-popup-scroll');
        }

        // После всей процедуры к нашему попапу добавляем класс open и он открывается (так в css сделано)
        currentPopup.classList.add('open');

        // навешиваем событие при клике
        currentPopup.addEventListener("click", function (e) {
            // если нету в родителях popup__content
            // то есть вне белой области, то есть если мы тыкнули куда-то, где нет родителя popup__content
            if (!e.target.closest('.popup__content')) {
                // то мы попап закроем
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

// Передаем активный объект | вторая переменная для того, если внутри попапа есть ещё попап и чтобы не нужно было опять скрывать скрол, когда уже скрыт
function popupClose(popupActive, doUnlock = true) {
    if (unlock) { // переменная в самом начале true
        // у активного убираем класс open
        popupActive.classList.remove('open');

        if (doUnlock) {
            bodyUnlock(); // вызываем функцию
        }
    }
}

function bodyLock(scrollValue) {
    // для того, чтобы скрывать скролл страницы это делается, чтобы не было небольшого смещения попапа на ширину полосы прокрутки
    // Расчитываем разницу между шириной окна и ширной объекта внутри него (чтобы получить ширину скрола)
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    
    if (lockPadding.length > 0) {
        // lockPadding в самом начале получали объекты с классом lock-padding
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            // добавляем каждому отступ справа высчитанный выше
            el.style.paddingRight = lockPaddingValue;
        }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock'); // класс в css прописан

    // для блокировки скролла для IOS 
    body.style.position = 'fixed';
    body.style.top = scrollValue + 'px';

    // блокируем переменную
    unlock = false;
    // и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    // для разблокировки скролла для IOS
    let scrollCoord = coordValuePopup() * (-1);

    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }

        body.style.paddingRight = '0px';

        // ! Кастомная обработка для нашего HEADER, когда открыт бургер не убирать блокировку скролла
        if (!document.querySelector('.header__burger-button.active')) {
            body.classList.remove('lock');

            // для разблокировки скролла для IOS
            body.style.position = '';
            body.style.top = '';
            window.scrollTo(0, scrollCoord);
        }

    }, timeout); // чтобы скрол появлялся только тогда, когда закончится анимация
    // блокируем переменную
    unlock = false;
    // и через время анимации возвращаем в true, чтобы не было повторных нажатий на попап
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

// Вообще необязательно, но пусть будет
document.addEventListener('keydown', function (e) {
    if (e.which === 27) { // код 27 = коду клавиши Esc
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// если будут какие-то проблемы с отображением/работой скрипта в Explorer 11, то надо добавить полифилы из его видео