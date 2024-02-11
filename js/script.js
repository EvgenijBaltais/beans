import { items } from './all_products.js'

document.addEventListener('DOMContentLoaded', () => {

    // Меню

    document.querySelector('.menu-area-w').addEventListener('click', () => {

        let target = event.target.parentElement

        if (target.parentElement.querySelector('.menu-icon').classList.contains('open')) {

            setTimeout(() => {
                document.querySelector('.nav-list').style.opacity = 0
                target.parentElement.querySelector('.menu-icon').classList.remove('open')
            }, 0)

            setTimeout(() => {
                document.querySelector('.nav-list').style.display = 'block'
            }, 150)
        }

        else {

            setTimeout(() => {
                document.querySelector('.nav-list').style.display = 'block'
                target.parentElement.querySelector('.menu-icon').classList.add('open')
            }, 0)
            
            setTimeout(() => {
                document.querySelector('.nav-list').style.opacity = 1
            }, 10)
        }
    });


    // Плюс-минус


    (function() {

        document.querySelectorAll('.item-amount-minus').forEach(item => {

            let valueInput

            item.addEventListener('click', () => {

                valueInput = event.target.parentElement.querySelector('.item-amount-value')

                if (valueInput.value <= 1) return false
                
                valueInput.value = +valueInput.value - 1
            })
        })

        document.querySelectorAll('.item-amount-plus').forEach(item => {

            let valueInput

            item.addEventListener('click', () => {

                valueInput = event.target.parentElement.querySelector('.item-amount-value')

                if (valueInput.value >= 99) return false
                
                valueInput.value = +valueInput.value + 1
            })
        })
    })();


    // Всплывающие формы

    (function() {

        if (!document.querySelectorAll('.send-request-link').length) return false

        document.querySelectorAll('.send-request-link').forEach(item => {
        
            item.addEventListener('click', () => {

                event.preventDefault()

                let form = `<div class = "overlay">

                        <div class = "form-order">
                            <div class = "close-form"></div>
                            <p class = "form-order-title">Отправить заявку</p>
                            <p class = "form-order-subtitle">И мы свяжемся с Вами в кратчайшие сроки</p>
                            <form class = "order-form" name = "order-form">
                                <div class = "form-order-wrapper">
                                    <div class = "form-order-item">
                                        <input type = "text" class = "form-order-input" name = "name" placeholder = "Ваше имя">
                                    </div>
                                    <div class = "form-order-item">
                                        <input type = "text" class = "form-order-input" name = "email" placeholder = "Ваш Email">
                                    </div>
                                    <div class = "form-order-item form-order-item-phone">
                                        <input type = "text" class = "form-order-input form-order-input-phone" name = "phone" placeholder = "Ваш телефон">
                                    </div>
                                    <div class = "form-order-item">
                                        <textarea class = "form-order-textarea" placeholder = "Текст комментария"></textarea>
                                    </div>
                                    <div class="contact-method">
                                        <p class = "contact-method-title">Какой способ связи для Вас предпочтительнее?</p>
                                        <div class = "contact-method-form">
                                            <label class="contact-label">
                                                <input type="radio" name="radio" checked />
                                                <span>Телефон</span>
                                            </label>
                                            <label class="contact-label">
                                                <input type="radio" name="radio" />
                                                <span>Whatsapp</span>
                                            </label>
                                            <label class="contact-label">
                                                <input type="radio" name="radio" />
                                                <span>Telegram</span>
                                            </label>
                                            <label class="contact-label">
                                                <input type="radio" name="radio" />
                                                <span>Не важно</span>
                                            </label>
                                            <div class = "contact-method-form-2">
                                                <label class="contact-label">
                                                    <input type="radio" name="radio-2" checked />
                                                    <span>Звонок</span>
                                                </label>
                                                <label class="contact-label">
                                                    <input type="radio" name="radio-2" />
                                                    <span>Сообщение</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class = "form-order-submit">
                                        <button type = "button" class = "form-order-btn btn">Отправить!</button>
                                    </div>
                                    <div class = "form-order-agree">
                                        * Нажимая на кнопку "Отправить!", Вы даете согласие на обработку персональных данных
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>`

                document.body.insertAdjacentHTML('beforeend', form)
                body_lock()

                // Маска телефона

                let im = new Inputmask("+7 (999) 999-99-99")
                    im.mask(document.querySelector('.form-order-input-phone'))

                // Отправка формы

                document.querySelector('.form-order-btn').addEventListener('click', () => {

                    let form = findParent (event.target, 'order-form')

                    if (!form.querySelector('input[name="phone"]').inputmask.isComplete()) {
                        form.querySelector('input[name="phone"]').style = 'border-color: red'
                        return false
                    }

                    let name = form.querySelector('input[name="name"]').value,
                        email = form.querySelector('input[name="email"]').value,
                        phone = form.querySelector('input[name="phone"]').value,
                        textarea = form.querySelector('textarea'),
                        str = 'name=' + name + '&email=' + email + '&phone=' + phone,
                        target = event.target


                    if (target.classList.contains('blocked')) return false

                    /*if (textarea.value == '' || textarea.value.length < 3) {

                        textarea.style.border =  '1px solid red'

                        setTimeout(() => {
                           textarea.removeAttribute('style')
                       }, 1000)
                        return false
                    }*/
                    

                    target.classList.add('blocked')
                    target.innerText = "Отправка..."

                    form.querySelectorAll('input[name="radio"]').forEach(item => {
                        item.checked ? str += '&type_of_connect=' + item.parentElement.querySelector('span').innerText : ''
                    })

                    form.querySelectorAll('input[name="radio-2"]').forEach(item => {
                        item.checked ? str += '&type_of_call=' + item.parentElement.querySelector('span').innerText : ''
                    })

                    str += '&comment=' + textarea.value

                    sendForm (str, '/libs/send-email-form.php', target)

                    target.innerText = "Успешно!"
                })

                // Сброс полей

                document.querySelector('.form-order-input-phone').addEventListener('click', () => {
                    event.target.style = 'border-color: #000'
                })

                document.querySelector('.form-order-input-phone').addEventListener('input', () => {
                    event.target.style = 'border-color: #000'
                })

                document.querySelector('.overlay').addEventListener('click', () => {

                    if (event.target.classList.contains('overlay') || event.target.classList.contains('close-form')) {

                        body_unlock()
                        document.querySelector('.overlay').remove()
                    }
                })
            })
        })
    })();

    // Всплывающие формы, конец

    if (document.querySelectorAll('.scroll-to').length) {
        document.querySelectorAll('.scroll-to').forEach(item => {
            item.addEventListener('click', () => {
                event.preventDefault()
                window.scrollTo({
                    top: document.getElementById(item.getAttribute('data-scroll-to')).offsetTop,
                    behavior: 'smooth'
                })
            })
        })
    }


    // Скроллинг и фиксация меню
    let time = 0
    document.addEventListener('scroll', () => {
        window.pageYOffset > 5 && time ? document.querySelector('.nav').classList.add('nav-static') : document.querySelector('.nav').classList.remove('nav-static')
        time = 1
    })


    // Выбор объема товара

    if (document.querySelectorAll('.volume-item-available').length) {
        document.querySelectorAll('.volume-item-available').forEach(item => {
            item.addEventListener('click', () => {
                event.target.parentElement.querySelectorAll('.volume-item-available').forEach(item => {
                    item.classList.remove('active')
                })
                item.classList.add('active')
            })
        })
    }

    // Выбор количества товара


    if (document.querySelector('.product-amount')) {

        let value = 0

        document.querySelector('.product-amount').querySelector('.amount-select-minus').addEventListener('click', () => {
            value = +event.target.parentElement.querySelector('.amount-select-value').value
            value > 1 ? event.target.parentElement.querySelector('.amount-select-value').value = value - 1 : ''
        })

        document.querySelector('.product-amount').querySelector('.amount-select-plus').addEventListener('click', () => {
            value = +event.target.parentElement.querySelector('.amount-select-value').value
            value <= 100 ? event.target.parentElement.querySelector('.amount-select-value').value = value + 1 : ''
        })
    }

    // Скроллинг меню

    // Если есть якорная #whywe ссылка в url

    if (window.location.href.indexOf('#whywe') != -1) {

        window.scrollTo({
            top: document.querySelector('.h2-title-whywe').offsetTop - 50,
            behavior: "smooth",
        })

        document.querySelector('.nav-list-link.active').classList.remove('active')
        document.querySelector('.nav-list-link-scroll').classList.add('active')
    }

    //

    document.querySelector('.nav-list-link-scroll').addEventListener('click', () => {
        if (document.querySelector('.plus-minus')) {
            event.preventDefault()
            window.scrollTo({
                top: document.querySelector('.h2-title-whywe').offsetTop - 50,
                behavior: "smooth",
            })

            document.querySelector('.nav-list-link.active').classList.remove('active')
            event.target.classList.add('active')
        }
    })


    // Все по корзине товаров и добавлению в нее
    
    if (document.querySelector('.cart')) {
        if (window.localStorage.getItem('order')) {
            document.querySelector('.cart').classList.add('full-cart')
        }
    }

    if (document.querySelectorAll('.item-order-btn')) {
        document.querySelectorAll('.item-order-btn').forEach(item => {
            item.addEventListener('click', () => {

                event.target.parentElement.parentElement.querySelector('.item-amount-value').value

                if (!event.target.getAttribute('data-id')) return false

                addToCart (event.target.getAttribute('data-id'), +event.target.parentElement.parentElement.querySelector('.item-amount-value').value)
                cartAddNotification()
            })
        })
    }


    if (document.querySelectorAll('.order-button-ins').length) {
        document.querySelectorAll('.order-button-ins').forEach(item => {
            item.addEventListener('click', () => {
                addToCart (event.target.getAttribute('data-id'), parseInt(document.querySelector('.amount-select-value').value))
            })
        })
    }

    function addToCart (id, amount) {

        let order = JSON.parse(window.localStorage.getItem('order'))

        if (order && order != null) {

            let id_isset = 0

            for (let i = 0; i < order.length; i++) {
                if (order[i].id == id) {
                    order[i].amount += amount
                    id_isset = 1
                    break
                }
            }

            !id_isset ? order.push({'id': id, 'amount': amount }) : ''

            window.localStorage.setItem('order', JSON.stringify(order))
            return false
        }

        order = []
        order.push({'id': id, 'amount': amount})
        window.localStorage.setItem('order', JSON.stringify(order))

        document.querySelector('.cart').classList.add('full-cart')
        return false
    }

    function cartAddNotification () {

        document.querySelector('.cart-warnings').insertAdjacentHTML('afterbegin', `
            <div class="cart-add-warning">Товар добавлен в корзину!</div>
        `)

        setTimeout(() => {
            document.querySelectorAll('.cart-add-warning')[document.querySelectorAll('.cart-add-warning').length - 1].remove()
        }, 1000)
    }
        
        
// Страница корзины

if (document.querySelector('.cart-wrapper')) {

    // Если нет заказа в корзине

    if (!window.localStorage.getItem('order')) {
        setTimeout(() => {
            emptyCartInfo()
        }, 500)
    }

    // Если есть заказ в корзине

    (() => {

        if (!window.localStorage.getItem('order')) return false

            document.querySelector('.cart-preloader').remove()

            let order_data = countData(),
                summ = 0,
                final_summ = 0 // со скидкой


            order_data.forEach(item => {
                summ += item.price
                final_summ += (item.price - item.price * item.sale / 100) * item.amount
            })


            document.querySelector('.cart-wrapper').insertAdjacentHTML('beforeend', `
                <div class = "cart-item cart-item-top">
                    <div class = "cart-pic"></div>
                    <div class = "cart-title item-title">Выбранные товары:</div>
                    <div class = "cart-amount item-title">Вес/объем</div>
                    <div class = "cart-weight item-title">Количество (шт)</div>
                    <div class = "cart-price item-title">Цена</div>
                    <div class = "cart-summ item-title">Общая стоимость</div>
                    <div class = "cart-remove"></div>
                </div>
            `)

            order_data.forEach(item => {

                document.querySelector('.cart-wrapper').insertAdjacentHTML('beforeend', `
                    <div class = "cart-item cart-item-row" data-id = "${item.id}">
                        <div class = "cart-pic">
                            <img src="/images/products/${item.id}/1.jpg" alt="" class = "product-cart-pic">
                        </div>
                        <div class = "cart-title simple-text">${item.name} ${[window.screen.width <= 1050 ? ` (${item.weight} г)` : ``]}</div>

                        ${[window.screen.width > 1050 ? ` <div class = "cart-weight simple-text">${item.weight} г</div>` : ``]}

                        <div class = "cart-amount simple-text">
                            <div class = "cart-amount-plus"></div>
                            <span class = "cart-amount-span">${item.amount} шт.</span>
                            <div class = "cart-amount-minus"></div>
                        </div>
                        <div class = "cart-price simple-text">
                            <p class = "cart-value">
                                ${item.sale > 0 ? `<span class = "cart-price-sale">${item.price} р.</span>` : ''}
                                <span class = "cart-price-fullprice">${item.sale == 0 ? item.price : item.price - (item.price * item.sale / 100)} р.</span>
                            </p>
                        </div>
                        <div class = "cart-summ simple-text">${item.amount * (item.price - (item.price * item.sale / 100))} р.</div>
                        <div class = "cart-remove">
                            <div class = "cart-close" title = "Удалить" data-id = ${item.id}></div>
                        </div>
                    </div>
                `)
            })

            document.querySelector('.cart-wrapper').insertAdjacentHTML('beforeend', `
                <div class = "cart-item-final">
                    <div class = "cart-item-info">Итого: <span class = "final-price" id = "final-price">${countFinalSumm(order_data)} р.</span></div>
                </div>
                <div class = "cart-item-res-w">
                    <div class="cart-btn btn-30px order-cart-button">
                        <div class = "order-cart-button-ins send-order-result"></div>
                        <span class="cart-btn-span">Оформить заказ</span>
                        <span class="cart-btn-ins"></span>
                    </div>
                </div>
            `)

            document.body.addEventListener('click', () => {

                if (event.target.classList.contains('send-order-result')) {

                    event.preventDefault()

                    if (document.querySelector('.cart-order-ww')) return false

                    document.querySelector('.cart-wrapper').insertAdjacentHTML('beforeend', `
                        <div class = "cart-order-ww">
                            <p class = "h2-title">Почти готово! Осталось только указать данные и оплатить:</p>
                            <div class = "cart-order-register">
                                <form name = "cart-order-register-form" class = "cart-order-register-form">
                                    <div class = "cart-order-input-w">
                                        <label>
                                            <p class = "cart-order-p">Ваше имя (по желанию):</p>
                                            <input type = "name" name = "name" class = "cart-order-input" placeholder="Имя">
                                        </label>
                                    </div>
                                    <div class = "cart-order-input-w">
                                        <label>
                                            <p class = "cart-order-p">Ваш email (по желанию):</p>
                                            <input type = "email" name = "email" class = "cart-order-input" placeholder="Email">
                                        </label>
                                    </div>
                                    <div class = "cart-order-input-w">
                                        <label>
                                            <p class = "cart-order-p">Ваш телефон (для уточнения заказа и доставки):</p>
                                            <input type = "phone" name = "phone" class = "cart-order-input required-field" placeholder="+7 (___) ___-__-__">
                                        </label>
                                    </div>
                                    <div class = "cart-order-input-w">
                                        <label>
                                            <p class = "cart-order-p">Ваш адрес и любые комментарии по заказу:</p>
                                            <textarea name = "textarea" class = "cart-order-textarea required-field" placeholder="Введите текст"></textarea>
                                        <label>
                                    </div>
                                    <div class = "pay-radio">
                                        <div class = "contact-method-form-2">
                                            <p class = "cart-order-p">Удобнее оплатить:</p>
                                            <div class = "pay-radio-div">
                                                <label class="contact-label">
                                                    <input type="radio" name="radio-2" class = "cart-radio cart-radio-1" checked />
                                                    <span>Наличными или переводом при получении</span>
                                                </label>
                                            </div>
                                            <div class = "pay-radio-div">
                                                <label class="contact-label">
                                                    <input type="radio" name="radio-2" class = "cart-radio cart-radio-2" />
                                                    <span>Сейчас на сайте</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="agree-block agree-block-final">
                                        <label for="checkbox" class="checkbox-label">
                                          <input type="checkbox" id="checkbox" class="checkbox" checked>
                                          <span class="checkbox-view">
                                            <svg class="checkbox-icon" xmlns="http://www.w3.org/2000/svg" width="18" viewBox="0 0 511.985 511.985">
                                                <path fill="#000" d="M500.088 83.681c-15.841-15.862-41.564-15.852-57.426 0L184.205 342.148 69.332 227.276c-15.862-15.862-41.574-15.862-57.436 0-15.862 15.862-15.862 41.574 0 57.436l143.585 143.585c7.926 7.926 18.319 11.899 28.713 11.899 10.394 0 20.797-3.963 28.723-11.899l287.171-287.181c15.862-15.851 15.862-41.574 0-57.435z"/>
                                            </svg>
                                          </span>
                                          <span class = "agree-text">Согласен на обработку персональных данных</span>
                                        </label>
                                    </div>
                                    <button class = "cart-form-send btn-10px">Отправить заявку!</button>
                                </form>
                            </div>
                        </div>
                    `)

                    setTimeout(() => {
                        document.querySelector('.cart-order-ww').scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        })
                    }, 100)

                    // Кнопка оплаты - изменение текста

                    document.querySelectorAll('.cart-radio').forEach(item => {
                        item.addEventListener('change', () => { 
                            event.target.classList.contains('cart-radio-1') ?
                                document.querySelector('.cart-form-send').innerText = 'Отправить заявку и оплатить при получении' :
                                document.querySelector('.cart-form-send').innerText = 'Оплатить онлайн'
                        })
                    })

                    // Маска телефона

                    new Inputmask("+7 (999) 999-99-99").mask(document.querySelector('input[name="phone"]'))

                    // Отправка заявки

                    let sending = 0

                    document.querySelector('.cart-form-send').addEventListener('click', () => {

                        event.preventDefault()

                        if (sending) return false

                        let btn = event.target,
                            form = event.target.parentElement,
                            phone = form.querySelector('input[name="phone"]'),
                            invalid_fields = 0

                        if (!phone.inputmask.isComplete()) {
                            phone.parentElement.parentElement.classList.add('input-w-false')
                            phone.parentElement.querySelector('.cart-order-p').innerText = "Пожалуйста, введите номер телефона:"
                            phone.parentElement.querySelector('.cart-order-p').style.color = "red"
                            invalid_fields++
                            event.target.innerText = "Некорректно введен телефон..."
                        }
                
                        if (!document.getElementById('checkbox').checked) {
                            document.querySelector('.agree-text').style.color = 'red'
                            invalid_fields++
                        }
                        
                        if (invalid_fields) return false

                        sending += 1

                        btn.innerText = 'Отправка...'

                        // Сбор данных корзины 

                        let items = {}

                        document.querySelectorAll('.cart-item-row').forEach((item, index) => {

                            items[index] = {}

                            items[index].name = item.querySelector('.cart-title').innerText
                            items[index].amount = item.querySelector('.cart-amount-span').innerText
                            items[index].weight = item.querySelector('.cart-weight').innerText
                            items[index].price = item.querySelector('.cart-price-fullprice').innerText
                            items[index].summ = item.querySelector('.cart-summ').innerText
                        })

                        fetch("/libs/send-cart.php", {
                            method: "POST",
                            body: JSON.stringify({
                                name: form.querySelector('input[name="name"]').value,
                                email: form.querySelector('input[name="email"]').value,
                                phone: phone.value,
                                textarea: form.querySelector('textarea').value,
                                payment: form.querySelector('input[name="radio-2"]:checked').parentElement.querySelector('span').innerText,
                                order: localStorage.order,
                                items: items,
                                final_price: document.getElementById('final-price').innerText
                            }),
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                        })
                        .then(response => {
                            if (!response.ok) throw Error(response.statusText)
                            response.ok ? btn.innerText = 'Успешно!' : ''
                        })
                        .catch(error => {
                            console.log(error)
                            btn.innerText = 'Ошибка отправки =('
                        })
                    })

                    document.getElementById('checkbox').addEventListener('change', () => {
                        document.querySelector('.agree-text').style.color = 'black'
                    })

                    document.querySelector('.cart-order-register-form').querySelectorAll('input[name="phone"]').forEach(item => {

                        item.addEventListener('focus', () => {
                            event.target.parentElement.parentElement.classList.remove('input-w-false')
                            event.target.parentElement.querySelector('.cart-order-p').innerText = "Ваш телефон (для уточнения заказа и доставки):"
                            event.target.parentElement.querySelector('.cart-order-p').removeAttribute('style')
                            document.querySelector('.cart-form-send').innerText = "Отправить заявку!"
                        })

                        item.addEventListener('keydown', () => {
                            event.target.parentElement.parentElement.classList.remove('input-w-false')
                            event.target.parentElement.querySelector('.cart-order-p').innerText = "Ваш телефон (для уточнения заказа и доставки):"
                            event.target.parentElement.querySelector('.cart-order-p').removeAttribute('style')
                            document.querySelector('.cart-form-send').innerText = "Отправить заявку!"
                        })
                    })
                }

                // Если изменение количества позиций в корзине
                
                let row, span, order_data = countData ()

                if (event.target.classList.contains('cart-amount-plus')) {

                    row = event.target.parentElement.parentElement
                    span = row.querySelector('.cart-amount-span')

                    if (parseInt(span.innerText) >= 99) return false

                    span.innerText = parseInt(span.innerText) + 1 + ' шт.'

                    // Обновление данных в localstorage
                    
                    for (let i = 0; i < order_data.length; i++) {
                       +order_data[i].id == +row.getAttribute('data-id') ? order_data[i].amount = parseInt(span.innerText) : ''
                    }

                    order_data.length ? window.localStorage.setItem('order', JSON.stringify(order_data)) : window.localStorage.removeItem('order', JSON.stringify(order_data))

                    // Обновление финальной суммы

                    row.querySelector('.cart-summ').innerText = parseInt(span.innerText) * parseInt(row.querySelector('.cart-price-fullprice').innerText) + ' р.'
                    document.getElementById('final-price').innerText = countFinalSumm(order_data) + ' р.'
                }

                if (event.target.classList.contains('cart-amount-minus')) {

                    row = event.target.parentElement.parentElement
                    span = row.querySelector('.cart-amount-span')

                    if (parseInt(span.innerText) <= 1) return false

                    span.innerText = parseInt(span.innerText) - 1 + ' шт.'

                    // Обновление данных в localstorage

                    for (let i = 0; i < order_data.length; i++) {
                        +order_data[i].id == +row.getAttribute('data-id') ? order_data[i].amount = parseInt(span.innerText) : ''
                    }

                    order_data.length ? window.localStorage.setItem('order', JSON.stringify(order_data)) : window.localStorage.removeItem('order', JSON.stringify(order_data))

                    // Обновление финальной суммы

                    row.querySelector('.cart-summ').innerText = parseInt(span.innerText) * parseInt(row.querySelector('.cart-price-fullprice').innerText) + ' р.'
                    document.getElementById('final-price').innerText = countFinalSumm(order_data) + ' р.'
                }
            })


            // Удаление столбца

            document.querySelectorAll('.cart-close').forEach(item => {

                item.addEventListener('click', () => {

                    for (let i = 0; i < order_data.length; i++) {
                        +order_data[i].id == +event.target.getAttribute('data-id') ? order_data.splice(i, 1) : ''
                    }

                    order_data.length ? window.localStorage.setItem('order', JSON.stringify(order_data)) : window.localStorage.removeItem('order', JSON.stringify(order_data))

                    event.target.parentElement.parentElement.remove()

                    // Обновить финальную сумму

                    let data = countData ()
                    document.getElementById('final-price').innerText = countFinalSumm(data) + ' р.'

                    // 

                    if (!document.querySelectorAll('.cart-item-row').length) {

                        document.querySelector('.cart-item-final').remove()
                        document.querySelector('.cart-item-top').remove()
                        document.querySelector('.cart-item-res-w').remove()
                        document.querySelector('.cart').classList.remove('full-cart')
                        emptyCartInfo ()

                        document.querySelector('.cart-order-ww').remove()
                    }
                })
            })
    })();


    // Функция берет данные из localstorage и записывает в массив для дальнейшего использования

    function countData () {

        let order = JSON.parse(window.localStorage.getItem('order')),
            order_data = []

            for (let key in order) {

                items.products.forEach(item => {
                    if (+order[key].id == +item.id) {
                        item.amount = +order[key].amount
                        order_data.push(item)
                    }
                })

                order_data.forEach(item => {
                    items.price.forEach(item2 => {
                        if (+item.id == +item2.id) {
                            item.price = +item2.actual_price
                            item.sale = +item2.sale
                        }
                    })
                })
            }
        return order_data
    }

    // Функция подсчитывает финальную сумму в корзине из данных localstorage 

    function countFinalSumm (order_data) {

        let final_summ = 0 // со скидкой

        order_data.forEach(item => {
            final_summ += (item.price - item.price * item.sale / 100) * item.amount
        })

        return final_summ
    }
    
    function emptyCartInfo () {

        document.querySelector('.cart-wrapper').insertAdjacentHTML('afterbegin', `
            <p class="simply-text">В корзине пока пусто...</p>
            <a class="simply-link right-margin-20" href = "/">На главную</a>
            <a class="simply-link" href = "/catalog">В каталог</a>
        `)
        document.querySelector('.cart-preloader') ? document.querySelector('.cart-preloader').remove() : ''
    }
}

})



/***
    Обработка форм
*/

    // Форма Есть пожелания? на главной
    

    if (document.querySelector('.reviews-form-send')) {

        document.querySelector('.reviews-form-send').addEventListener('click', () => {

            event.preventDefault()

            let form = event.target.parentElement,
                name = form.querySelector('input[name="name"]').value,
                email = form.querySelector('input[name="email"]').value,
                textarea = form.querySelector('textarea'),
                str = 'name=' + name + '&email=' + email,
                target = event.target

            if (target.classList.contains('blocked')) return false

            if (textarea.value == '' || textarea.value.length < 3) {

                textarea.style.outline =  '1px solid red'

                setTimeout(() => {
                   textarea.removeAttribute('style')
               }, 1000)

                return false
            }

            if (!form.querySelector('.checkbox').checked) {
                form.querySelector('.agree-text').style.color = 'red'
                return false
            }

            target.classList.add('blocked')

            target.innerText = 'Отправка..'

            str += '&comment=' + textarea.value

            sendCommentData (str, '/libs/send-email-comment.php', target)

            target.innerText = 'Успешно!'
        })

        document.getElementById('checkbox').addEventListener('change', () => {
            document.querySelector('.agree-text').style.color = 'black'
        })
    }
    

/** Обработка форм, конец  */


function body_lock() {

    let body = document.body;
    if (!body.classList.contains('scroll-locked')) {
        let bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        body.classList.add('scroll-locked');
        body.style.top = "-" + bodyScrollTop + "px";
        body.setAttribute("data-popup-scrolltop", bodyScrollTop)
    }
}

function body_unlock() {
    let body = document.body;
    if (body.classList.contains('scroll-locked')) {
        let bodyScrollTop = document.body.getAttribute("data-popup-scrolltop");
        body.classList.remove('scroll-locked');
        body.style.top = "";
        body.removeAttribute("data-popup-scrolltop")
        window.scrollTo(0, bodyScrollTop)
    }
}

function findParent (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function getClickedElementIndex(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (event.target == arr[i]) return i;
	}
}


async function sendCommentData (str, url, target) {

    let response = await fetch(url, {
        method: 'POST',
        headers: {  
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },
        body: str
    })

    let result = await response

    if (result.ok) {
        target.innerText = 'Успешно!'

        setTimeout(() => {
            target.innerText = 'Отправить!'
            target.classList.remove('blocked')
        }, 8000)

        ym(95042043,'reachGoal','send_review')
    }

    if (!result.ok) {

        target.innerText = 'Ошибка!'

        setTimeout(() => {
            target.innerText = 'Отправить!'
            target.classList.remove('blocked')
        }, 8000)
    }
}


async function sendForm (str, url, target) {

    let response = await fetch(url, {
        method: 'POST',
        headers: {  
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
        },
        body: str
    })

    let result = await response

    if (result.ok) {
        target.innerText = 'Успешно!'

        setTimeout(() => {
            target.innerText = 'Отправить!'
            target.classList.remove('blocked')
        }, 8000)

        ym(95042043,'reachGoal','send_form')
    }

    if (!result.ok) {

        target.innerText = 'Ошибка!'

        setTimeout(() => {
            target.innerText = 'Отправить!'
            target.classList.remove('blocked')
        }, 8000)
    }
}