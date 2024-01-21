// Маска номера телефона (в самом низу)
// Вывод картинок и удаление при клике по ним
// Кастомный select - отдельный скрипт
// Кастомный range слайдер - отдельный скрипт

// Проверка на то, что документ уже загружен
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    // Событие submit при отправке формы
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        // Сразу блокируем отправку формы
        event.preventDefault();

        // Валидация (проверка) формы, обращение к функции
        let error = formValidate(form);

        // Функционал для отправки формы:
        let formData = new FormData(form); // вытягивает все данные полей формы
        formData.append('image', formImage_1.files[0]); // также запихиваем изображения, что получали ниже
        formData.append('image', formImage_2.files[0]); // также запихиваем изображения, что получали ниже

        if (error === 0) {
            // Так как отправка формы может быть не быстрой, то надо показать пользователю это
            // То есть вешать какую-то "загрузку"
            form.classList.add('_sending'); // стилизуется в scss
            // alert('Отправка пройдет успешно!');
            // form.classList.remove('_sending');
            // Этого достаточно, для реализации формы верстки без отправки
            // ! этот участок комментить, для проверки, он отвечает за отправку формы
            // ! все РАБОТАЕТ, но только если указывать в форме почту yandex
            
            // Когда все проверки прошли успешно, то отправляем форму через AJAX запрос (fetch)
            // в переменную response ждем выполнения отправки методом POST данных formData в файл sendmail.php
            let response = await fetch('/phpmailer/sendmail.php', {
                method: 'POST',
                body: formData
            });
            // Проверка, успешна ли отправка
            console.log(response);
            console.log(formData);
            // console.log(response.json()); // закоментировать, чтобы потом он ниже сработал
            
            if (response.ok) {
                // файл sendmail.php будет возвращать JSON ответ
                let result = await response.json(); // из-за него вызывается ошибка             
                alert(result.message); // вывод сообщения об отправке
                // Чистим форму после отправки
                formPreview_1.innerHTML = '';
                formPreview_2.innerHTML = '';
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }

            // ! --------------
        } else { // помимо красных полей ещё вылезет такое сообщение (можно прикрутить и попап)
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(form) {
        let error = 0;
        // Дежурный класс для обязательный полей
        let formReq = document.querySelectorAll('._req'); 

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            // Прежде, чем приступать к проверке, то надо убрать класс error
            formRemoveError(input);

            // Начинаем проверку
            if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else if (input.classList.contains('_email')) {
                // Если проверка email что-то возвращает, то добавляем error
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (document.getElementById('formMobile').value !== '') {
                let userPhoneValue = document.getElementById('formMobile').value.replace(/[^0-9]/g,"");
                if (userPhoneValue.length != 11) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        // Возвращаем значение error, оно либо 0, либо больше 0
        return error; 
    }
    // Функции добавления/убирания класса ошибки у родителя и у самого объекта
    // _error стилизуем в scss
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    // Функция теста email (регулярное выражение)
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    // Отображении картинки при её добавлении: (ТОЛЬКО ОДНОЙ КАРТИНКИ, ДЛЯ БОЛЬШЕГО ЧИСТА НЕ РЕШИЛ КАК + НЕТ УДАЛЕНИЯ)
    // Получаем инпут file в переменную
    const formImage_1 = document.getElementById('formImage_1');
    // Получаем див для превью в переменную
    const formPreview_1 = document.getElementById('formPreview_1');

    const formImage_2 = document.getElementById('formImage_2');
    const formPreview_2 = document.getElementById('formPreview_2');

    // Слушаем изменения в инпуте file
    formImage_1.addEventListener('change', () => {
        uploadFile(formImage_1.files[0], formPreview_1);
    });
    // Слушаем изменения в инпуте file
    formImage_2.addEventListener('change', () => {
        uploadFile(formImage_2.files[0], formPreview_2);
    });

    function uploadFile(file, formPreview) {
        // Проверяем тип файла
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Разрешены только изображения!');
            // formImage_1.value = '';
            return;
        }
        // Проверим размер файла (<2 Mb)
        if (file.size > 2 * 1024 * 1024) {
            alert('Файл должен быть не более 2 Мб!');
            return;
        }        

        // Если все проверки прошли успешно, то выводим картинку с помощью встроенной функции FileReader()
        var reader = new FileReader();
        reader.onload = function (e) {
            formPreview.innerHTML = `<img class="addedFile" src="${e.target.result}" alt="Фото">`;
        };
        reader.onerror = function (e) {
            alert('Ошибка :(');
        };
        reader.readAsDataURL(file);
    }
});

// Маска для поля ввода номера телефона
window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.getElementsByName('user_phone'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false);

  });

});