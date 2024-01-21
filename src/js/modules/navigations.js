// Навигационный скролл до нужного объекта
// Ссылкам надо дописывать атрибут с классом блока, до которого хотим добираться:
// data-goto=".main__aboutserv"
"use strict"
const headerBlock = document.querySelector('.header__huge-container');
document.addEventListener('click', menuNavigation);

function menuNavigation(e) {
    const targetElement = e.target;
    if (targetElement.closest('[data-goto]')) {
        const goTo = targetElement.closest('[data-goto]').dataset.goto;
        const goToElement = document.querySelector(goTo);

        // Для открытого меню бургера
        const headerMenu = document.querySelector('.header__menu');
        const mainBody = document.body;
        const burgerButton = document.querySelector('.header__burger-button');

        if (headerMenu.classList.contains('active')) {
            burgerButton.classList.remove('active');
            headerMenu.classList.remove('active');
            mainBody.classList.remove('lock');
            mainBody.style.position = '';
        }
        // Для удаления фона header при мобильном расширении
        if (goToElement.className === 'main__banner') {            
            headerBlock.classList.remove('active');
        }

        if (goToElement) {
            window.scrollTo({
                top: goToElement.offsetTop - 50,
                behavior: "smooth"
            });
        }
        e.preventDefault();
    }
}

// ----------------------------------------------------------------------------
// Кнопка навигации "Наверх"
// const scrollTopButton = document.querySelector('.navigation-top__button');
// let defaultScroll = 0;

// window.addEventListener('scroll', buttonAppear);
// scrollTopButton.addEventListener('click', function() {
//     window.scrollTo({
//         top: 0,
//         left: 0,
//         behavior: "smooth",
//     });
// });

// function buttonAppear() {
//     let eventScroll = window.pageYOffset;
//     let deltaScroll = defaultScroll - eventScroll;

//     if (eventScroll === 0) {
//         if(scrollTopButton.classList.contains('active')) {
//             scrollTopButton.classList.remove('active');
//         }
//     }
//     else if (deltaScroll > 0) {
//         scrollTopButton.classList.add('active');
//     } else {
//         if(scrollTopButton.classList.contains('active')) {
//             scrollTopButton.classList.remove('active');
//         }
//     }

//     defaultScroll = eventScroll;
// }