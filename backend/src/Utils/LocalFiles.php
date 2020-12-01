<?php
namespace App\Utils;
define('UPLOAD_DIR', 'uploads/');

class LocalFiles
{
    public function save(string $data): string
    {
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
        $file = UPLOAD_DIR . uniqid() . '.' . $type;
        file_put_contents($file , $data);
        return $file;
    }
}

