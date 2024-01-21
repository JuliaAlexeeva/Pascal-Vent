// !!! ДЛЯ ФИКСИРУЮЩЕЙ ШАПКИ:

// Функция с фиксацией body для IOS, так как там не работает свойство overflow: hidden
// которое присваивается body через класс lock (в nullstyle) (ФИКСАЦИЯ ПО АНАЛОГУ КАК В ПОПАПАХ)
let burgerButton = document.querySelector('.header__burger-button');
let burgerMenu = document.querySelector('.header__menu');
let mainBody = document.body;

let headerContainer = document.querySelector('.header__huge-container');

/*===================================================================================*/
// Функция для определения координаты body при скролле к нужному попапу (для фиксации body на IOS)
function coordValue() {
    const currentWindowCoord = document.body.getBoundingClientRect().top;
    return currentWindowCoord;
}
/*===================================================================================*/
burgerButton.addEventListener('click', function () {
    // СПЕРВА МЫ ПО ФУНКЦИИ ПОЛУЧАЕМ ОТРИЦАТЕЛЬНОЕ ЗНАЧЕНИЕ И НА ТАКОМ ФИКСИРУЕМ BODY
    let scrollValue = coordValue();
  
    burgerButton.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    headerContainer.classList.toggle('active'); // добавляет фон
    mainBody.classList.toggle('lock');

    // коррелирует с шапкой (header), если ей не задать fixed, а body присваивать, то шапку перекроет
    mainBody.style.position = 'fixed';
    mainBody.style.top = scrollValue + 'px';

    if (!(burgerButton.classList.contains('active'))) {
        // А ПОТОМ ЕЩЁ РАЗ ПОЛУЧАЕМ И ДЕЛАЕМ ЕГО ПОЛОЖИТЕЛЬНЫМ И ПРОСКРОЛЛИВАЕМ
        scrollValue = coordValue() * (-1);
        mainBody.style.position = '';
        mainBody.style.top = '';
        window.scrollTo(0, scrollValue);
    }
});
/*===================================================================================*/
// TODO: чтобы при изменении ширины экрана убирался active у Бургера
window.addEventListener('resize', resizeBurger);
// переменная для того, чтобы код при resize отработала единожды
var isResize = false;
export function resizeBurger() {
    let currentDeviceWidth = window.innerWidth;
    // при включенном бургере и изменить ширину более 768px то произойдет скролл в самое начало страницы
    // не получилось просчитать момент фиксации :(

    if (currentDeviceWidth >= 991 && !isResize) {
        burgerButton.classList.remove('active');
        burgerMenu.classList.remove('active');
        headerContainer.classList.remove('active');
        mainBody.classList.remove('lock');
        mainBody.style.position = '';
        mainBody.style.top = '';

        isResize = true;
    } else if (currentDeviceWidth < 768 && isResize) {
        isResize = false;
    }
}
/*===================================================================================*/
// TODO: чтобы при скролле добавлялся фон к header
window.addEventListener('scroll', function() {
    let scrollValue = window.pageYOffset;
    if (scrollValue > 1) {
        if (!document.querySelector('.header__burger-button.active')) {
            headerContainer.classList.add('active-scroll');
        }
    } else {
        let popupActive = document.querySelector('.popup.open');
        headerContainer.classList.remove('active-scroll');
        if (!popupActive && scrollValue === 0) {
            headerContainer.classList.remove('active-popup-scroll');
        }
        
    }
});
/*===================================================================================*/