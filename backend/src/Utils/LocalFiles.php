<?php
namespace App\Utils;
define('UPLOAD_DIR', 'uploads/');

class LocalFiles
{
    public function save(string $data): string
    {

        // function clog($txt){
        //     $date = date('Y-m-d H:i:s');
        //     $logText = $date . ' -> ' . $txt;
        //     $myfile = file_put_contents('logs.txt', '__________________________________'.PHP_EOL , FILE_APPEND | LOCK_EX);
        //     $myfile = file_put_contents('logs.txt', $logText.PHP_EOL , FILE_APPEND | LOCK_EX);
        // }

        // Base64 -> Image
        if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
            $data = substr($data, strpos($data, ',') + 1);
            $type = strtolower($type[1]); // jpg, png, gif
            if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                throw new \Exception('invalid image type');
            }
            $data = str_replace( ' ', '+', $data );
            if ($data === false) {
                throw new \Exception('base64_decode failed');
            } else {
                $data = base64_decode($data);
            }
        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $uuid = uniqid();

        // Save orig image
        $file = UPLOAD_DIR . $uuid . '.' . $type;
        file_put_contents($file , $data);

        // Gen thumbimage
        $thumbFile = UPLOAD_DIR . $uuid . '-thumb.' . $type;
        $desired_width="500";
        fixOrientation($file);
        generateThumb($file, $thumbFile, $desired_width, $type);
        return $file;
    }

    public function delete(string $data): void
    {
        unlink($data);
    }
}


// Fix image orientation
function fixOrientation($source, $quality = 90, $destination = null)
{
    if ($destination === null) {
        $destination = $source;
    }
    $info = getimagesize($source);
    $exif = exif_read_data($source);
    if ($info['mime'] === 'image/jpeg') {
        $exif = exif_read_data($source);
        if (!empty($exif['Orientation']) && in_array($exif['Orientation'], [2, 3, 4, 5, 6, 7, 8])) {
            $image = imagecreatefromjpeg($source);
            if (in_array($exif['Orientation'], [3, 4])) {
                $image = imagerotate($image, 180, 0);
            }
            if (in_array($exif['Orientation'], [5, 6])) {
                $image = imagerotate($image, -90, 0);
            }
            if (in_array($exif['Orientation'], [7, 8])) {
                $image = imagerotate($image, 90, 0);
            }
            if (in_array($exif['Orientation'], [2, 5, 7, 4])) {
                imageflip($image, IMG_FLIP_HORIZONTAL);
            }
            imagejpeg($image, $destination, $quality);
        }
    }
    return true;
}

 // make thumbnail
 function generateThumb($src, $dest, $desired_width, $type) {
    if($type === 'jpg' || $type === 'jpeg'){
        $source_image = imagecreatefromjpeg($src);
    }
    if($type === 'png'){
        $source_image = imagecreatefrompng($src);
    }
    if($type === 'gif'){
        $source_image = imagecreatefromgif($src);
    }
    $width = imagesx($source_image);
    $height = imagesy($source_image);
    $desired_height = floor($height * ($desired_width / $width));
    $virtual_image = imagecreatetruecolor($desired_width, $desired_height);
    imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
    imagejpeg($virtual_image, $dest); 
    imagedestroy($virtual_image);

}