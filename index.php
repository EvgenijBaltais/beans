<?php


require "system/Route.php";
require_once("php/products_from_db.php");
require_once("php/functions.php");

$url = key($_GET);

$r = new Router();
$r->addRoute('/', 'main.php');
$r->addRoute('/about', 'about.php');
$r->addRoute('/cart', 'cart.php');
$r->addRoute('/catalog', 'catalog.php');
$r->addRoute('/contacts', 'contacts.php');
$r->addRoute('/404', '404.php');
$r->addRoute('/catalog/kofe_v_zernah', 'kofe_v_zernah.php');
$r->addRoute('/catalog/molotiy_kofe', 'molotiy_kofe.php');
$r->addRoute('/php/cart_data', 'php/cart_data.php');

for ($i = 0; $i < count($products); $i++) {
	$r->addRoute('/catalog/' . $products[$i]['url_name'], 'catalog/page.php');
}

$r->route("/" . $url, $products);

?>