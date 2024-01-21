let worksSlider = {
    name: ".portfolio-works__swiper",
    prevButton: ".portfolio-nav__prev",
    nextButton: ".portfolio-nav__next",
    gap: 30,
    countSwipeSlides: 1,
}

let clientsSlider = {
    name: ".clients-logos__swiper",
    prevButton: ".clients-nav__prev",
    nextButton: ".clients-nav__next",
    gap: 20,
    countSwipeSlides: 1,
}

let sliderGroup = [worksSlider, clientsSlider];

for (let index = 0; index < sliderGroup.length; index++) {
    const sliderGroupItem = sliderGroup[index];
    // Инициализация Swiper
    new Swiper(`${sliderGroupItem.name}`, {
        // Стрелки
        navigation: {
            prevEl: `${sliderGroupItem.prevButton}`,
            nextEl: `${sliderGroupItem.nextButton}`
        },

        // Включение/отключение перетаскивания на ПК
        simulateTouch: true,
        // Чувствительность свайпа
        touchRatio: 1,
        // Угол срабатывания свайпа/перетаскивания (не понял, что делает)
        touchAngle: 45,
        // Курсор перетаскивания
        grabCursor: true,

        // Отключение функционала, если слайдов меньше, чем нужно (например, указали выше 3, а слайдов 2, то слайдер отключится)
        watchOverflow: true,

        // Отпступ между слайдами
        spaceBetween: sliderGroupItem.gap,

        // Количество пролистываемых слайдов
        slidesPerGroup: sliderGroupItem.countSwipeSlides,

        // Кол-во дублирующих слайдов
        looperSlides: 3,

        // БРЕЙК ПОИНТЫ (АДАПТИВ)
        // Ширина экрана (mobile first, то есть сработает тогда, когда ширина болешь, чем указано)

        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            450: {
                slidesPerView: 1.2,
            },
            479: {
                slidesPerView: 1.5,
            },
            679: {
                slidesPerView: 1.8,
            },
            768: {
                slidesPerView: 2,
            },
            888: {
                slidesPerView: 2.5,
            },
            991: {
                slidesPerView: 3,
            },
        },

        // Включать эти два значения надо тогда, когда slidesPerView: auto или больше, чем 1
        // Слежка за видимыми слайдами
        watchSlidesProgress: true,
        // Добавление класса видимым слайдам
        watchSlidesVisibility: true,
    });
}