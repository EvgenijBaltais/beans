<?
	$weights = get_weights($data);
	$brands = get_brands($data);
	$get_weight = check_get_weight ($weights);
?>

<div class = "catalog-filters section">
	<section class = "filters-blocks-items filters-products">
		<h3 class="h4-title">Фильтры:</h3>
		<div class = "filters-blocks">
			<a class = "filters-block-item<? if ($_SERVER['REQUEST_URI'] == '/catalog'): ?> active<? endif;?>" href = "/catalog">
				Все
			</a>
			<a class = "filters-block-item<? if (strpos($_SERVER['REQUEST_URI'], 'kofe_v_zernah')): ?> active<? endif;?>" href = "/catalog/kofe_v_zernah">
				Кофе в зернах
			</a>
			<a class = "filters-block-item<? if (strpos($_SERVER['REQUEST_URI'], 'molotiy_kofe')): ?> active<? endif;?>" href = "/catalog/molotiy_kofe">
				Кофе молотый
			</a>
		</div>
	</section>
	<section class = "filters-brands-blocks-items filters-brands">
		<h3 class="h4-title">Бренды:</h3>
		<div class = "filters-brands-blocks">
			<a class = "filters-brands-block-item filter-item all-filter-item<? if ($_SERVER['REQUEST_URI'] == '/catalog'): ?> active<? endif;?>">Все</a>
			<? foreach ($brands as $item): ?>
				<?
					$dataBrand = strtolower(str_replace(' ', '-', $item));
					$dataBrand = strtolower(str_replace('(', '', $dataBrand));
					$dataBrand = strtolower(str_replace(')', '', $dataBrand));
				?>
				<a class = "filters-brands-block-item filter-item" data-brand= "<?=$dataBrand;?>"><?=$item;?></a>
			<? endforeach; ?>
		</div>
	</section>
	<section class = "filters-blocks-items filters-volume">
		<h3 class="h4-title">Показать товары по весу:</h3>
		<div class = "filters-blocks">
			<a class = "filter-item filters-block-item<? if ($_SERVER['REQUEST_URI'] == '/catalog'): ?> active<? endif;?>">Все</a>
			<? foreach ($weights as $item): ?>
				<? (int)$item == '1' ? $dataItem = 1000 : $dataItem = (int)$item;?>
				<a class = "filter-item filters-block-item all-filter-item<?=$get_weight == $item ? ' active' : '';?>" data-weight = "<?=$dataItem;?>"><?=$item == 1000 ? '1 кг' : $item . ' г';?></a>
			<? endforeach; ?>
		</div>
	</section>
	<button class = "clear-filters">Сбросить фильтры</button>
</div>