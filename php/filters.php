<?
	$weights = get_weights($data);
	$brands = get_brands($data);
	$get_weight = check_get_weight ($weights);
?>

<section class = "catalog-filters section">
	<h2 class="h3-title">Фильтры:</h2>
	<section class = "filters-blocks-items filters-products">
		<h3 class="h4-title">Разделы:</h3>
		<div class = "filters-blocks">
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
			<? foreach ($weights as $item): ?>
				<? (int)$item == '1' ? $dataItem = 1000 : $dataItem = (int)$item;?>
				<span class = "filter-item filters-block-item<?=$get_weight == $item ? ' active' : '';?>" data-weight = "<?=$dataItem;?>"><?=$item == 1000 ? '1 кг' : $item . ' г';?></span>
			<? endforeach; ?>
		</div>
	</section>
	<button class = "clear-filters">Сбросить фильтры</button>
</section>