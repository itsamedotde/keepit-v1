<?php
namespace App\Utils;
define('UPLOAD_DIR', 'uploads/');

class LocalFiles
{
    public function save(string $data): string
    {

        


        function make_thumb($src, $dest, $desired_width, $type) {
            //$exif = exif_read_data($src);
            //var_dump($exif);
            
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
        }


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
        $file = UPLOAD_DIR . $uuid . '.' . $type;
        file_put_contents($file , $data);
        $thumbFile = UPLOAD_DIR . $uuid . '-thumb.' . $type;
        $desired_width="500";
        make_thumb($file, $thumbFile, $desired_width, $type);

        /************************************* */
        function __image_orientate($source, $quality = 90, $destination = null)
        {
            if ($destination === null) {
                $destination = $source;
            }
            $info = getimagesize($source);
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

        __image_orientate($thumbFile);



        return $file;

        /************************************ */
    }

    public function delete(string $data): void
    {
        unlink($data);
    }
}

