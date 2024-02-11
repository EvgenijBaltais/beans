<?

$breadcrumbs = '<li><a href = "/">Главная</a></li>';
strpos($_SERVER["REQUEST_URI"], 'catalog') ? $breadcrumbs .= '<li><span>&nbsp;→&nbsp;Каталог</span></li>' : '';
strpos($_SERVER["REQUEST_URI"], 'kofe_v_zernah') ? $breadcrumbs = '<li><a href = "/">Главная</a></li><li>&nbsp;→&nbsp;<a href = "/catalog">Каталог</a></li><li>&nbsp;→&nbsp;<span>Кофе в зернах</span></li>' : '';
strpos($_SERVER["REQUEST_URI"], 'molotiy_kofe') ? $breadcrumbs = '<li><a href = "/">Главная</a></li><li>&nbsp;→&nbsp;<a href = "/catalog">Каталог</a></li><li>&nbsp;→&nbsp;<span>Кофе молотый</span></li>' : '';

if (isset($url_item)) {
	$breadcrumbs = '<li><a href = "/">Главная</a></li><li>&nbsp;→&nbsp;<a href = "/catalog">Каталог</a></li>';
	$item['category'] == 'Кофе в зернах' ? $breadcrumbs .= '<li>&nbsp;→&nbsp;<a href = "/catalog/kofe_v_zernah">Кофе в зернах</a></li>' : '';
	$item['category'] == 'Кофе молотый' ? $breadcrumbs .= '<li>&nbsp;→&nbsp;<a href = "/catalog/molotiy_kofe">Кофе молотый</a></li>' : '';
	$breadcrumbs .= '<li>&nbsp;→&nbsp;<span>' . $item['brand'] . ' ' . $item['name'] . ' ' . $item['weight'] . '</span></li>';
}

?>

<div class = "breadcrumbs section">
	<ul class = "breadcrumbs-list">
		<?=$breadcrumbs;?>
	</ul>
</div>
