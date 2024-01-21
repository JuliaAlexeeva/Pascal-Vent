let servicesButtons = document.querySelectorAll('.services-inter__button');
let servicesInterBlocks = document.querySelectorAll('.services-inter__inner');

servicesButtons.forEach(button => {
    button.addEventListener('click', showServiceBlock);
});

function showServiceBlock() {
    let dataAttr = this.getAttribute('data-target');
    let textClassName = `.${dataAttr}-inner`;
    
    // Убираем у всех active
    servicesButtons.forEach(button => {
        button.classList.remove('active');
    });
    servicesInterBlocks.forEach(interBlock => {
        interBlock.classList.remove('active');
    });

    // Добавляем только тому тексту и той кнопке, на которую нажали
    if (!this.classList.contains('active')) {
        this.classList.add('active');
        document.querySelector(textClassName).classList.add('active');
    }
}

