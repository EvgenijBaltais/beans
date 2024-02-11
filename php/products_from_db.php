<?

require_once('./system/db.php');

$sql = "SELECT 
    products.id AS id,
    products.name AS name,
    category.name AS category,
    brands.name AS brand,
    countries.name AS country,
    weights.value AS weight,
    blends.blend AS blend,
    product_info.products_text AS products_text,
    product_info.images AS images,
    product_info.tastes AS tastes,
    product_info.beans_region AS beans_region,
    rating,
    sale,
    price,
    value,
    available,
    roasting,
    url_name FROM products
    JOIN weights ON products.weight=weights.id
    JOIN blends ON products.blend=blends.id
    JOIN brands ON products.brand=brands.id
    JOIN countries ON products.country=countries.id
    JOIN category ON products.category=category.id
    JOIN product_info ON products.id=product_info.products_id
    where available = 1 order by `priority`";
$result = $conn->query($sql);

while($row = mysqli_fetch_assoc($result)) {
    $products[] = $row;
}

?>