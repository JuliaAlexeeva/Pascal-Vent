// First Form
// const submitFormCheckButton = document.getElementById('submit_form-call');
// let inputFormCheckFields = document.querySelectorAll('.form-call__input');
// let userNameInput = document.getElementById('user_name');
// let userPhoneInput = document.getElementById('user_phone');

// submitFormCheckButton.addEventListener('click', function() {
//     checkInput(inputFormCheckFields);
// });

// function checkInput(inputFields) {
//     // Для каждого поля по порядку своя проверка
//     for (let i = 0; i < inputFields.length; i++) {
//         let inputFieldNumb = inputFields[i].parentNode;
        
//         if (i == 0) {
//             let inputFieldValue = inputFields[i].value;
//             if (inputFieldValue == '') {
//                 inputFieldNumb.classList.add('required');
//                 event.preventDefault();
//             } else {
//                 inputFieldNumb.classList.remove('required');
//             }
//         }
//         if (i == 1) {
//             // Получаем значение value из пола номера телефона и убираем все лишнее, оставляя только цифры
//             let userPhoneValue = userPhoneInput.value.replace(/[^0-9]/g,"");
//             if (userPhoneValue.length != 11) {
//                 inputFieldNumb.classList.add('required');
//                 event.preventDefault();
//             } else {
//                 inputFieldNumb.classList.remove('required');
//             }
//         }

//     }

// }

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