<?php

$tag = $_POST['tag'];
$query = rawurlencode( '{"query":{"term":{"asset.assettag.raw":"'.$tag.'"}}}' );


$arrContextOptions=array(
    "ssl"=>array(
        "verify_peer"=>false,
        "verify_peer_name"=>false,
    ),
);  

$response = file_get_contents("https://lnop.nor.root.lundin.lan/ei-applet/search?cmd=DODIRECTSEARCH&clientname=elasticsearch-prod&index=assetmodel&search=".$query, false, stream_context_create($arrContextOptions));
echo $response;



?>
