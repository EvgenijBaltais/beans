	document.addEventListener('DOMContentLoaded', () => {

	;(function(){

		// Создание чата

		document.body.insertAdjacentHTML('beforeend', `
			<div class = "chat-closed"></div>
			<div class = "dialog">
				<p class = "ask-manager">Консультант</p>
				<div class="chat-close"></div>
				<div class = "dialog-wrapper"></div>
			</div>`)

		const dialog = document.querySelector('.dialog'),
			dialogContentArea = document.querySelector('.dialog-wrapper'),
			dialogIcon = document.querySelector('.chat-closed')


		document.querySelector('.chat-closed').addEventListener('click', () => {
			openChat (dialog, dialogIcon)
		})

		document.querySelector('.chat-close').addEventListener('click', () => {
			closeChat (dialog, dialogIcon)
		})


		// Вызов чата с кнопки в хедере и футере
		
		document.querySelectorAll('.top-contact-link-chat').forEach(item => {

			item.addEventListener('click', () => {

				dialogContentArea.innerHTML = ''
				openChat (dialog, dialogIcon)
				addFastOrderStep_7 ()

				scrollChat (document.querySelectorAll('.manager-phrase')[0], 'center')
			})
		})

		// Быстрый заказ в карточке

		document.querySelectorAll('.one-click-order').forEach(item => {

			item.addEventListener('click', () => {
				openChat (dialog, dialogIcon)

				let card = event.target.parentElement.parentElement

				addFastOrderStep_1 (
					card.getAttribute('data-id'),
					card.getAttribute('data-weight'),
					card.querySelector('img').getAttribute('src'),
					card.querySelector('.item-title-link').innerText,
					card.querySelector('.item-amount-value').value,
					card.getAttribute('data-price')
				)
			})
		})

		// Всякие вспомогательные действия в чате

		document.body.addEventListener('click', () => {

			// Прибавление и убавление товаров
			let val = 1,
				num,
				price

			if (event.target.classList.contains('step-order-select')) {

				num = event.target.parentElement.querySelector('.step-order-num')
				price = event.target.parentElement.parentElement.querySelector('.order-price-val')

				if (event.target.classList.contains('step-order-minus')) {

					if (parseInt(num.innerText) <= 1) return false
					
					val = parseInt(num.innerText) - 1
					num.innerText = val + ' шт.'
					price.innerText = (parseInt(price.getAttribute('data-default-value')) * val).toLocaleString('ru')  + ' р.'
				}

				if (event.target.classList.contains('step-order-plus')) {

					if (parseInt(num.innerText) >= 99) return false
					
					val = parseInt(num.innerText) + 1
					num.innerText = val + ' шт.'
					price.innerText = (parseInt(price.getAttribute('data-default-value')) * val).toLocaleString('ru')  + ' р.'
				}
			}

			// Конец

			// Шаг подтвердите выбор
			

			// Если все верно, то далее
			if (event.target.classList.contains('fast-order-ok')) {

				addActiveClass (event.target)

				removeSteps (event.target)
				addFastOrderStep_2()
				scrollChat (document.querySelectorAll('.manager-phrase')[3])
			}

			// Если есть вопросы то показываем контакты
			if (event.target.classList.contains('fast-order-no')) {

				addActiveClass (event.target)

				removeSteps (event.target)
				addFastOrderStep_6()
				scrollChat (document.querySelectorAll('.manager-phrase')[3])	
			}

			// Шаг подтвердите выбор, конец..


			// Шаг при выборе платежной системы

			if (event.target.classList.contains('fast-order-after') || event.target.classList.contains('fast-order-now')) {

				addActiveClass (event.target)
				addFastOrderStep_3 ()
				scrollChat (document.querySelectorAll('.manager-phrase')[4])
			}

			// Нажатие на кнопку готово после ввода адреса

			if (event.target.classList.contains('chat-ready-adress')) {

				// Проверка textarea на заполненность

				if (document.querySelector('.step-manager-textarea').value == '') {
					document.querySelector('.step-manager-textarea').style.border = '1px solid red'
					return false
				}

				// Выбор способа подтверждения и переход к следующему шагу

				let type_of_submit = ''
				document.querySelectorAll('.chat-contact-label input').forEach(item => {
					if (item.checked) {
						type_of_submit = item.parentElement.innerText
						return false
					}
				})

				addFastOrderStep_4 (type_of_submit)
				event.target.classList.add('active')
				scrollChat (document.querySelectorAll('.manager-phrase')[5])
			}

			// Нажатие на кнопку Отправить заказ в конце в диалоге без оплаты

			if (event.target.classList.contains('chat-ready-send')) {

				// Проверка телефона на заполненность

				if (!document.querySelector('.step-manager-phone').inputmask.isComplete()) {
					document.querySelector('.step-manager-phone').style.border = '1px solid red'
					return false
				}

				let result = true
				let order_number = 1
				let confirm_type = ''

				document.querySelectorAll('.chat-contact-label input').forEach(item => {
					if (item.checked) {
						confirm_type = item.parentElement.innerText
						return false
					}
				})

				addFastOrderStep_5 (result, order_number, confirm_type)
				scrollChat (document.querySelectorAll('.manager-phrase')[5])
			}
			// Конец

			if (event.target.classList.contains('send-request-in-chat')) {

				addFastOrderStep_7 ()
				scrollChat (document.querySelectorAll('.manager-phrase')[4], 'center')
			}



			// Конец

		})

		// конец..

		function closeChat (dialog, icon) {

			window.screen.width < 480 ? body_unlock() : ''
			dialog.style.display = 'none'
			icon.style.display = 'block'
		}

		function openChat (dialog, icon) {

			window.screen.width < 480 ? body_lock() : ''
			icon.style.display = 'none'
			dialog.style.display = 'block'
		}

		// Функция добавления шага в карточке товара

		function addFastOrderStep_1 (id, weight, pic, title, price, num) {
			
			dialogContentArea.innerHTML = ''

			dialogContentArea.insertAdjacentHTML('beforeend',
				`${startDialogStepHtml()}
						<span>Добрый день! Ваш выбор:</span>
				${endDialogStepHtml()}
				${startDialogStepHtml()}
						<img src = "${pic}" class = "step-order-pic">
						<p class = "step-order-title">${title}.</p>
						<p class = "step-order-num">
							<span>Количество:&nbsp;</span>
							<a class = "step-order-num bold-text-600" data-default-value = ${num}>${num} шт.</a>
							<a class = "step-order-select step-order-minus"></a>
							<a class = "step-order-select step-order-plus"></a>
						</p>
						<p class = "step-order-price">
							<span>Стоимость заказа:</span>&nbsp;
							<span class = "order-price-val bold-text-600" data-default-value = ${price}>${(parseInt(price) * parseInt(num)).toLocaleString('ru')} р.</span>
						</p>
				${endDialogStepHtml()}
				${startDialogStepHtmlFullWidth()}
						<span>Все верно?</span>
						<div class = "step-manager-btns">
							<a class = "step-manager-btn fast-order-ok">Все верно</a>
							<a class = "step-manager-btn fast-order-no">Есть вопросы</a>
						</div>
				${endDialogStepHtml()}
				`
			)
		}

		function addFastOrderStep_2 () {
			dialogContentArea.insertAdjacentHTML('beforeend',
				`${startDialogStepHtml()}
					<span>Отлично! Вам удобнее оплатить заказ сейчас на сайте или при получении товара?<br>
					Мы принимаем оплату любым удобным способом.</span>
					<div class = "step-manager-btns">
						<a class = "step-manager-btn fast-order-now">Сейчас</a>
						<a class = "step-manager-btn fast-order-after">При получении</a>
					</div>
				${endDialogStepHtml()}
				`
			)
		}

		function addFastOrderStep_3 () {
			
			if (document.querySelector('.adress-textarea')) {

				// Костыль для смены написи на финальной кнопке
				if (document.querySelector('.chat-ready-send')) {
					document.querySelector('.chat-ready-send').innerText =
						document.querySelector('.fast-order-now').classList.contains('active') ? `Перейти к оплате` : `Отправить заказ`
				}

				return false
			}

			dialogContentArea.insertAdjacentHTML('beforeend',
				`${startDialogStepHtml()}
						<div class = "adress-textarea">
							<p class = "step-manager-adress-text">Куда прислать подтверждение по заказу?</p>
							<form class = "chat-radio-btns" name = "chat-radio-btns">
								<label class="chat-contact-label">
									<input type="radio" name="radio" checked>
									<span>Telegram</span>
								</label>
								<label class="chat-contact-label">
									<input type="radio" name="radio">
									<span>Звонок</span>
								</label>
								<label class="chat-contact-label">
									<input type="radio" name="radio">
									<span>Whatsapp</span>
								</label>
								<label class="chat-contact-label">
									<input type="radio" name="radio">
									<span>Email</span>
								</label>
							</form>
							<p class = "step-manager-adress-text bold-text-600">Адрес для доставки и любые комментарии:</p>
							<textarea name = "textarea" class = "step-manager-textarea"></textarea>
							<a class = "chat-ready chat-ready-adress">Готово</a>
						</div>
						${endDialogStepHtml()}
					`
			)

			document.querySelector('.step-manager-textarea').addEventListener('keyup', () => {
				event.target.style.border = '1px solid rgb(199, 199, 199)'
			})
		}


		function addFastOrderStep_4 (submit_type) {

			if (document.querySelector('.chat-ready-send')) return false

			dialogContentArea.insertAdjacentHTML('beforeend',
				`${startDialogStepHtml()}
					<p class = "step-manager-adress-text">Почти готово, остался последний шаг:</p>
					<div class = "step-manager-inputs">
						<label class = "step-manager-label">
							<p class = "step-manager-label-p bold-text-600">Ваше имя (по желанию):</p>
							<input type = "text" name = "name" class = "step-manager-input step-manager-name" placeholder = "Имя">
						</label>
						<label class = "step-manager-label">
							<p class = "step-manager-label-p bold-text-600">Ваш телефон:</p>
							<input type = "text" name = "phone" class = "step-manager-input step-manager-phone" placeholder = "+7 (___) ___-__-__">
						</label>
						${submit_type == 'Email' ? `
							<label class = "step-manager-label">
								<p class = "step-manager-label-p bold-text-600">Ваш email:</p>
								<input type = "text" name = "name" class = "step-manager-input step-manager-email" placeholder = "Ваш email">
							</label>` : ''
						}
						<div class = "chat-agree-block">
							<p class = "chat-agree-text">* Нажимая на кнопку "Отправить заказ", Вы даете согласие на обработку персональных данных</p>
						</div>
						<div class = "submit-btns">
							<a class = "chat-ready chat-ready-send">
								${document.querySelector('.fast-order-now').classList.contains('active') ? `Перейти к оплате` : `Отправить заказ`}
							</a>
						</div>
					</div>
				${endDialogStepHtml()}
				`
			)

			addPhoneMask (document.querySelector('.step-manager-phone'))
		}

		function addFastOrderStep_5 (result, order_number, confirm_type) {

			dialogContentArea.insertAdjacentHTML('beforeend',
				`
					${startDialogStepHtml()}
						<p class = "step-manager-adress-text">Спасибо! Мы получили ваш заказ № ${order_number}.</p>
						${confirm_type == 'Telegram' ?
							`<p class = "step-manager-adress-text">В ближайшее время пришлем вам подтверждение в Telegramm!</p>`
						: ''}
						${confirm_type == 'Звонок' ?
							`<p class = "step-manager-adress-text">В ближайшее время перезвоним вам и подтвердим информацию!</p>`
						: ''}
						${confirm_type == 'Whatsapp' ?
							`<p class = "step-manager-adress-text">В ближайшее время пришлем вам подтверждение в Whatsapp!</p>`
						: ''}
						${confirm_type == 'Email' ?
							`<p class = "step-manager-adress-text">В ближайшее время пришлем вам подтверждение на Email!</p>`
						: ''}
					${endDialogStepHtml()}
				`
			)
		}


		function addFastOrderStep_6 () {

			dialogContentArea.insertAdjacentHTML('beforeend',
				`
					${startDialogStepHtml()}
						<p class = "step-manager-adress-text">Мы готовы ответить на все ваши вопросы любым удобным способом.</p>
						<div class = "we-are-in-messengers">
							<span class = "step-manager-title">В мессенджерах:</span>
							<p class = "messengers-items">
								<a href = "" class = "messengers-item-link telegram">Telegram</a>
								<a href = "" class = "messengers-item-link whatsapp">Whatsapp</a>
							</p>
						</div>
						<p class = "step-manager-phone-w">
							<span>Телефон: </span>
							<a href = "tel:+70000000000" class = "step-manager-phone-link">+7 (999) 000-00-00</a>
						</p>
						<p class = "step-manager-email-w">
							<span>Email: <span>
							<a href = "mailto:mail@bluebeans.ru" class = "step-manager-email-link">mail@bluebeans.ru</a>
						</p>
						<p>
							<span>Или <a class = "send-request-in-chat">оставить заявку</a> в чате и мы перезвоним вам.</span>
						</p>
					${endDialogStepHtml()}
				`
			)
		}



		function addFastOrderStep_7 () {

			if (document.querySelector('.step-manager-inputs')) return false

			dialogContentArea.insertAdjacentHTML('beforeend',
				`
					${startDialogStepHtml()}
						<div class = "step-manager-inputs">
							<label class = "step-manager-label">
								<p class = "step-manager-p bold-text-600">Ваше имя (по желанию):</p>
								<input type = "text" name = "name" class = "step-manager-input step-manager-name" placeholder = "Имя">
							</label>
							<label class = "step-manager-label">
								<p class = "step-manager-label-p bold-text-600">Ваш телефон:</p>
								<input type = "text" name = "phone" class = "step-manager-input step-manager-phone" placeholder = "+7 (___) ___-__-__">
							</label>
							<p class = "step-manager-label-p bold-text-600">Текст:</p>
							<textarea name = "textarea" class = "step-manager-textarea-request"></textarea>
							<div class = "chat-agree-block">
								<p class = "chat-agree-text">* Нажимая на кнопку "Отправить заказ", Вы даете согласие на обработку персональных данных</p>
							</div>
							<div class = "submit-btns">
								<a class = "chat-ready-request chat-ready-send">Отправить</a>
							</div>
						</div>
					${endDialogStepHtml()}
				`
			)

			addPhoneMask (document.querySelector('.step-manager-phone'))
		}


		function startDialogStepHtml () {
			return `<div class = "manager-phrase">
					<div class = "manager-img"></div>
					<div class = "manager-text">`
		}

		function startDialogStepHtmlFullWidth () {
			return `<div class = "manager-phrase">
					<div class = "manager-img"></div>
					<div class = "manager-text manager-text-fullwidth">`
		}

		function endDialogStepHtml () {
			return `</div></div>`
		}

		function removeSteps (target) {
			let isset = 0
			document.querySelectorAll('.manager-phrase').forEach(item => {

				if (isset) {
					item.remove()
					return
				}

				item.contains(target) ? isset = 1 : ''
			})
		}

		function addPhoneMask (el) {
			let im = new Inputmask("+7 (999) 999-99-99")
				im.mask(el)

				el.addEventListener('keyup', () => {
				event.target.style.border = '1px solid rgb(199, 199, 199)'
			})
			el.addEventListener('focus', () => {
				event.target.style.border = '1px solid rgb(199, 199, 199)'
			})
		}

		function addActiveClass (target) {

			target.parentElement.querySelectorAll('.step-manager-btn').forEach(item => {
				item.classList.remove('active')
			})

			target.classList.add('active')
		}

		function scrollChat (element, type = "start") {
			element.scrollIntoView({behavior: "smooth", block: type})
		}

		function body_lock() {

			let body = document.body;
			if (!body.classList.contains('scroll-locked')) {
				let bodyScrollTop = (typeof window.pageYOffset !== 'undefined') ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
				console.log(document.querySelector('.nav').classList.contains('nav-static'))
				document.querySelector('.nav').classList.contains('nav-static') ? document.querySelector('.nav').classList.add('nav-static-temporary') : ''
				body.classList.add('scroll-locked');
				body.style.top = "-" + bodyScrollTop + "px";
				body.setAttribute("data-popup-scrolltop", bodyScrollTop)
			}
		}
		
		function body_unlock() {
			let body = document.body;
			if (body.classList.contains('scroll-locked')) {
				let bodyScrollTop = document.body.getAttribute("data-popup-scrolltop");
				document.querySelector('.nav').classList.contains('nav-static-temporary') ? document.querySelector('.nav').classList.remove('nav-static-temporary') : ''
				body.classList.remove('scroll-locked');
				body.style.top = "";
				body.removeAttribute("data-popup-scrolltop")
				window.scrollTo(0, bodyScrollTop)
			}
		}
	})();
})
	
/*
const doc = document;
export default class Chatbot {

	constructor (options) {
		const t = this;

	    // Default options
	    t.options = {


		}

		t._init();
	}


	_init() {
		console.log('init')
	}

}
*/

