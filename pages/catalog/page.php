
<?	
	$url_item = substr($url, 9);
	$item = [];

	for ($i = 0; $i < count($data); $i++) {
		$data[$i]['url_name'] == $url_item ? $item = $data[$i] : '';
	}

?>
<!DOCTYPE html><html lang="ru-RU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?=$item['category'];?> <?=$item['brand'];?> <?=$item['name'];?> <?=$item['weight'];?></title>
<link rel="canonical" href="https://bluebeans.ru/catalog/<?=$url_item;?>">
<meta name="description" content="Предлагаем вашему вниманию <?=mb_strtolower($item['category']);?> <?=$item['brand'];?> <?=$item['name'];?> <?=$item['weight'];?> с доставкой по Москве и Московской области">
<meta name="keywords" content="купить кофе в зернах 1 кг, купить хороший кофе в зернах, <?=$item['brand'];?> <?=$item['name'];?> <?=$item['weight'];?>">

	<link rel="shortcut icon" href="/favicon.svg">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="manifest" href="/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#ffc40d">
	<meta name="theme-color" content="#ffffff">

	<meta property="og:url" content="https://bluebeans.ru/catalog/<?=$url_item;?>">
	<meta property="og:title" content="<?=$item['category'];?> <?=$item['brand'];?> <?=$item['name'];?>, <?=$item['weight'];?>">
	<meta property="og:description" content="Предлагаем вашему вниманию <?=mb_strtolower($item['category']);?> <?=$item['brand'];?> <?=$item['name'];?>, <?=$item['weight'];?> с доставкой по Москве и Московской области">
	<meta property="og:type" content="website">
	<meta property="og:image" content="/fon.jpg">
	<meta property="og:image:type" content="image/jpg">
	<meta property="og:image:width" content="400">
	<meta property="og:image:height" content="300">
	<meta property="og:image:alt" content="Coffee cup and beans">
	<link rel="stylesheet" href="../css/main.min.css">
</head>
	<body>
	<? require_once('./php/nav.php');?>
	<main class = "wrapper non-main-wrapper">
		<? require_once("php/breadcrumbs.php");?>
		<div class="section product-item">
			<div class = "product-pics hidden-el">
				<div class="glide">
					<div class="glide__track" data-glide-el="track">
						<div class="glide-w">
							<div class = "glide__item">
								<div style = "background-image: url('../images/catalog/brands/<?=$item['id'];?>/1_m.png');" class = "glide__item-pic" data-index = "1">
									<div class = "show-gallery"></div>
								</div>
							</div>
							</div>
							<div class="glide__arrows" data-glide-el="controls">
								<button class="glide__arrow glide__arrow--left product-pics-arrow product-pics-left" data-glide-dir="<"></button>
									<button class="glide__arrow glide__arrow--right product-pics-arrow product-pics-right" data-glide-dir=">"></button>
								</div>
							</div>
						</div>
						<div class = "product-icons">
							<div class="product-icons-ins">
								<? for ($i = 1; $i <= (int)$item['images']; $i++): ?>
									<button class="product-icon-item" data-glide-dir="=<?=$i-1;?>" style = "background-image: url('../images/catalog/brands/<?=$item['id'];?>/<?=$i;?>_s.png');"></button>
								<? endfor; ?>
							</div>
						</div>
					</div>
					<section class = "product-description">
						<h2 class="secondary-h2"><?=$item['category'];?> <?=$item['brand'];?> <?=$item['name'];?></h2>
						<div class = "product-content-item">
							<div class = "item-info-w-2">
								<div class = "amount-select">
									<div class = "amount-select-minus">–</div>
									<div class = "item-amount-val-block-2">
										<label for = "num-<?=$item['id'];?>">
											<input type="text" name = "item-amount-value" class = "amount-select-value" readonly = "readonly" value = "1" id = "num-<?=$item['id'];?>" aria-label="Количество товаров для заказа">
										</label>
									</div>
									<div class = "amount-select-plus">+</div>
								</div>
								<div class = "item-info-2 item-info-1-2">
									<?=$item['sale'] ? '<span class = "item-info__full-2">' . $item['price'] .  ' ₽</span>' : '';?>
									<span class = "item-info__span-2"><?=$item['sale'] ? floor($item['price'] - $item['price'] / $item['sale'])  : $item['price'];?> ₽</span>
								</div>
							</div>
						</div>
						<div class = "product-accessibility">
							<? if ($item['available']):?>
							<div class = "accessibility-div">
								<svg aria-hidden="true" class = "accessibility-svg"><circle cx="7.5" cy="7.5" r="7.5" fill="rgb(62,214,96, .3)"/><circle cx="7.5" cy="7.5" r="5" stroke="rgb(255, 255, 255)" stroke-width="1" fill="rgb(62,214,96)"/></svg>
								<span>В наличии</span>
							</div>
							<? else:?>
							<div class = "accessibility-div">
								<svg aria-hidden="true" class = "accessibility-svg"><circle cx="7.5" cy="7.5" r="7.5" fill="rgb(180, 3, 2, .3)"/><circle cx="7.5" cy="7.5" r="5" stroke="rgb(255, 255, 255)" stroke-width="1" fill="rgb(180, 3, 2)"/></svg>
								<span class = "product-rejected">Товар закончился.</span>
							</div>
							<span class = "accessibility-span">Обратите внимание на другие товары в <a href = "/catalog/">каталоге</a>.</span>
							<? endif; ?>
						</div>
						<section class = "product-content">
							<h2 class = "product-content-title">В одной упаковке содержится:</h2>
							<div class = "product-content-item">
								<span class = "price-info-span">Вес:</span>
								<span class = "product-content-span"><?=$item['weight'];?></span>
							</div>
							<? if ($item['blend']):?>
							<div class = "product-content-item product-content-item-flex">
								<span class = "price-info-span">Сорт:</span>
								<span class = "product-content-span"><?=$item['blend'];?></span>
							</div>
							<? endif; ?>
							<? if ($item['tastes']): ?>
								<div class = "product-content-item product-content-item-flex">
									<span class = "price-info-span">Вкус:</span>
									<span class = "product-content-span"><?=$item['tastes'];?></span>
								</div>
							<? endif;?>
							<? if ($item['beans_region']): ?>
								<div class = "product-content-item product-content-item-flex">
									<span class = "price-info-span">Происхождение зерен:</span>
									<span class = "product-content-span"><?=$item['beans_region']?></span>
								</div>
							<? endif;?>
							<? if ($item['roasting']):?>
							<div class = "product-content-item product-content-item-flex">
								<span class = "price-info-span">Обжарка:</span>
								<? for ($i = 0; $i < 8; $i++):?>
									<div class = "roasting-bean" style = "background-image: url('../images/icons/<?=($i + 1 <= $item['roasting'] ? 'roast' : 'nonroast'); ?>.svg'); "></div>
								<? endfor; ?>
							</div>
							<? endif; ?>
							<? //if ($item['roasting']):?>
							<div class = "product-content-item product-content-item-flex">
								<span class = "price-info-span">Для кого:</span>
								
							</div>
							<? //endif; ?>
							</section>
							<div class = "product-item-add-cart">
								<div class = "order-buttons">
									<div class="order-button order-button-cart" data-id = "<?=$item['id']?>">
										Добавить в корзину
									</div><!--
									<div class="red-btn btn-30px order-button">
										<div class = "order-button-ins"></div>
										<span class="order-btn-span">Быстрый заказ через чат</span>
										<div class="red-btn-ins"></div>
									</div>-->
								</div>
							</div>
						<?
							$different_weight_product = [];
							
							foreach ($data as $item2) {
								if ($item2['name'] == $item['name']) {
									array_push($different_weight_product, $item2);
								}
							}
						?>
						<? if (count($different_weight_product) > 1): ?>

							<?
								usort($different_weight_product, function($a, $b) {
									return $a['weight'] <=> $b['weight'];
								});
							?>
							<div class = "product-volume">
								<span class = "product-span bold-text-600">Этот товар также доступен в объеме:</span>
								<div class = "volume-variants">
									<? foreach ($different_weight_product as $item2): ?>
										<? if ($item2['weight'] != $item['weight']): ?>
											<a class="volume-item" href = "/catalog/<?=$item2['url_name'];?>">
												<span><?=$item['category'];?> <?=$item['brand'];?> <?=$item['name'];?>,</span> <span class = "bold-text-600"><?=$item2['weight']?></span>
											</a>
										<? endif; ?>
									<? endforeach; ?>
								</div>
							</div>
						<? endif; ?>
					</section>
					<? if ($item['products_text']): ?>
					<section class = "product-dop-content">
						<h2 class = "product-dop-text">Несколько слов о товаре:</h2>
						<div>
							<p class="product-p">
								<?=$item['products_text'];?>
							</p>
						</div>
					</section>
					<? endif; ?>
					<section class = "our-advantages">
						<h3 class = "our-advantages-title">Почему стоит заказать именно у нас?</h3>
						<ul class = "our-advantages-list">
							<li class = "our-advantages-item">Только оригинальный кофе от проверенных поставщиков.<br>Если вдруг не устроит качество - вернем деньги.</li>
							<li class = "our-advantages-item">Гибкие условия доставки - доставим сегодня, завтра и когда угодно.</li>
							<li class = "our-advantages-item">Принимаем оплату онлайн и на месте, всеми удобными для вас способами.</li>
							<li class = "our-advantages-item">На связи в мессенджерах и по телефону с 9-00 до 21-00 и готовы оперативно решить любую проблему.</li>
							<li class = "our-advantages-item">Бережно относимся к товару. Привезем его в целости и надежно упакованным.</li>
							<li class = "our-advantages-item">Учитываем пожелания каждого клиента и всегда готовы пойти навстречу.</li>
						</ul>
					</section>
				</div>
				<? require_once('./php/show-more.php');?>
				<section class = "section product-details">
					<h2 class = "h2-title">Подробнее о товаре:</h2>
					<div class = "product-details-info">
						<div class = "product-details-item">
							<p class = "product-details-item__title">Бренд</p>
							<p class = "product-details-item__text"><?=$item['sale'];?></p>
						</div>
						<div class = "product-details-item">
							<p class = "product-details-item__title">Сорт кофе</p>
							<p class = "product-details-item__text"><?=$item['blend'];?></p>
						</div>
						<div class = "product-details-item">
							<p class = "product-details-item__title">Степень обжарки</p>
							<p class = "product-details-item__text"><?=$item['roasting'];?> / 8</p>
						</div>
						<div class = "product-details-item">
							<p class = "product-details-item__title">Способ приготовления</p>
							<p class = "product-details-item__text">В эспрессо-машине (30-50 мл воды на 6-7 г кофе), фильтр-кофеварке, турке (100-150 мл воды на 6-7 г кофе).</p>
						</div>
						<div class = "product-details-item">
							<p class = "product-details-item__title">Особенности</p>
							<p class = "product-details-item__text">чёрный кофе</p>
						</div>
						<div class = "product-details-item">
							<p class = "product-details-item__title">Вид упаковки</p>
							<p class = "product-details-item__text">флоу-пак</p></div><div class = "product-details-item"><p class = "product-details-item__title">Материал упаковки</p><p class = "product-details-item__text">смесь полимеров</p></div><div class = "product-details-item"><p class = "product-details-item__title">Срок годности</p><p class = "product-details-item__text">1 год</p></div><div class = "product-details-item"><p class = "product-details-item__title">Условия хранения</p><p class = "product-details-item__text">До и после вскрытия хранить в закрытой упаковке в сухом прохладном месте.</p></div></div></section>
						<? require_once('./php/subscribe-form.php');?>
						<? require_once('./php/feedback-form.php');?>
						</main><? require_once('./php/footer.php');?><script src = "/node_modules/@glidejs/glide/dist/glide.min.js"></script><script type="module" src = "../js/script.min.js"></script><script src = "../js/carousels.min.js"></script></body></html>