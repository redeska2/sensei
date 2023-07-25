// Проверить, было ли модальное окно уже показано
var modalShown = false;

// Функция для показа модального окна
function showModal() {
    if (!modalShown) {
        var modal = document.querySelector('.modal');
        modal.style.display = 'block';
        modalShown = true;
    }
}

// Закрыть модальное окно
function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';}

// Показать модальное окно через 10 секунд
setTimeout(showModal, 10000);

// Обработчик события прокрутки страницы
window.addEventListener('scroll', handleScroll);

// Обработчик события клика на серую область вне модального окна
var modal = document.querySelector('.modal');
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});
var modalClose = document.querySelector('.modal_close');
modalClose.addEventListener('click', closeModal);

// Функция для обработки события прокрутки страницы
function handleScroll() {
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop >= documentHeight - windowHeight) {
        showModal();
        window.removeEventListener('scroll', handleScroll); // Удалить обработчик события прокрутки после показа модального окна
    }
}
var btnGet = document.getElementById('btn-get');
btnGet.addEventListener('click', function() {
    showModal();
});

function showModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';
}
function showModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }
  
  function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
  