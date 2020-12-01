<?php
namespace App\Utils;
use Google\Cloud\Vision\V1\ImageAnnotatorClient;

class VisionApi
{
    public function getLabels(string $path): array
    {
        $imageAnnotator = new ImageAnnotatorClient([
            'credentials' => '../vision-api-key.json',
         ]);

        $image = file_get_contents($path);
        $response = $imageAnnotator->labelDetection($image);
        $labels = $response->getLabelAnnotations();
        $returnLabels = [];
        if ($labels) {
            foreach ($labels as $label) {
                if($label->getScore() >= 0.9){
                    $returnLabels[] = $label->getDescription();
                }
            }
        } 
        $imageAnnotator->close();
        return $returnLabels;
    }
}

