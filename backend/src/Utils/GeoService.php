<?php
namespace App\Utils;

class GeoService {
    public function getLocationData(string $lat, string $lng): array {

        $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='.$lat.','.$lng.'&sensor=false&key='.$_ENV['MAP_API_KEY'];
        $json = @file_get_contents($url);
        $data = json_decode($json);
        $status = $data->status;
        if($status=="OK") {
            for ($j=0;$j<count($data->results[0]->address_components);$j++) {
                $cn=array($data->results[0]->address_components[$j]->types[0]);
                if(in_array("locality", $cn)) {
                    $city= $data->results[0]->address_components[$j]->long_name;
                }
                if(in_array("country", $cn)) {
                    $country= $data->results[0]->address_components[$j]->long_name;
                }
            }
            return [$city , $country];
         } else{
           $city = 'Unknown';
           $country = 'Unknown';
           return [$city , $country];
         }
    }
} 


