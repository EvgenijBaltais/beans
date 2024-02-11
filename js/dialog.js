document.addEventListener('DOMContentLoaded', () => {

    createChat ()

    // Функции

    function createChat () {
        document.body.insertAdjacentHTML('beforeend', `
            <div class = "get-dialog"></div>
            <div class = "dialog closed-chat">
                <div class = "dialog-top">
                    <div class = "close-chat" title = "Закрыть чат"></div>
                    <span class = "close-title">Напишите нам</span>
                </div>
                <div class = "dialog-body">

                    <div class = "d-step">
                        <div class = "d-manager"></div>
                        <div class = "d-text">Добрый день! Я робот Мария! Отличный выбор! С удовольствием приму Вашу заявку на кофе!</div>
                    </div>

                </div>

                <div class = "dialog-enter">
                    <p>Введите имя:</p>
                    <p>Введите телефон:</p>
                    <div class = "d-enter"></div>
                </div>
            </div>
        `)
    }

    document.querySelector('.get-dialog').addEventListener('click', () => {
        showChat ()
    })

     document.querySelector('.close-chat').addEventListener('click', () => {
        closeChat ()
    })

    function addStep () {
        
    }

    function showChat () {
        document.querySelector('.dialog').classList.remove('closed-chat')
    }

    function closeChat () {
        event.target.parentElement.parentElement.classList.add('closed-chat')
    }



})