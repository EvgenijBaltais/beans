<section class = "more-items-slides section">
	<h2 class = "h2-title">Наши покупатели также выбирают:</h2>
	<div class = "catalog-carousel-nav">
		<div class = "catalog-carousel__arrow catalog-carousel__left"></div>
		<div class="carousel-catalog__dots"></div>
		<div class = "catalog-carousel__arrow catalog-carousel__right"></div>
	</div>
	<div class = "catalog-carousel">
		<div class="glide__track" data-glide-el="track"> 
			<div class = "glide__slides catalog-carousel__slides">
				<? foreach ($data as $key => $item2): ?>
					<? if ($key == 6) break;?>
					<div class="product-card catalog-carousel__item" data-id="<?=$item2['id'];?>">
						<div class="assortment-item-w">
							<div class = "product-marks">
								<? if ($item2['rating'] >= 90):?>
									<div class = "product-card-bestseller" title = "Выбор покупателей"></div>
								<? endif; ?>
								<? if ($item2['sale']): ?>
									<div class = "sale-mark" title = "На товар действует скидка"></div>
								<? endif; ?>
							</div>
							<span class = "one-click-order">Быстрый заказ</span>
							<div class = "item-top">
								<a href = "/catalog/<?=$item2['url_name'];?>">
									<img src="/images/catalog/brands/<?=$item2['id'];?>/1_s.png" title = "" alt="" class = "product-pic">
								</a>
							</div>
							<div class = "item-bottom">
								<p class = "item-title">
									<a class = "item-title-link" href ="/catalog/<?=$item2['url_name'];?>" title = "Подробнее">
										<span class = "thin-font-style"><?=$item2['category'];?></span> <span class = "item-title-text"><?=$item2['brand'];?> <?=$item2['name'];?>, <?=$item2['weight'];?></span></a>
								</p>
								<div class = "item-info-w">
									<div class = "item-info item-info-1">
										<span class = "item-info__span">Цена:</span>
									</div>
									<div class = "item-info item-info-2">
										<?=$item2['sale'] ? '<span class = "item-info__full">' . $item2['price'] .  'р.</span>' : '';?>
										<span class = "item-info__span"><?=$item2['sale'] ? floor($item2['price'] - $item2['price'] / $item2['sale']) : $item2['price'];?> р</span>
									</div>
								</div>
								<div class = "item-more-less">
									<span class = "item-more-span">Количество:</span>
									<div class = "item-plus-minus">
										<div class = "item-amount-minus"></div>
										<div class = "item-amount-val-block">
											<label for = "num-<?=$item2['id'];?>">
												<input type="text" name = "item-amount-value" class = "item-amount-value" readonly = "readonly" value = "1" id = "num-<?=$item2['id'];?>" aria-label="Количество товаров для заказа">
											</label>
										</div>
										<div class = "item-amount-plus"></div>
									</div>
								</div>
								<div class = "item-order-info">
									<span class = "small-btn btn-10px item-order-btn">Заказать</span>
									<a href = "/catalog/<?=$item2['url_name'];?>" class = "small-btn btn-10px item-more-btn">Подробнее</a>
								</div>
							</div>
						</div>
					</div>
				<? endforeach; ?>
			</div>
		</div>
	</div>
</section>