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

        # annotate the image
        $image = file_get_contents($path);
        $response = $imageAnnotator->labelDetection($image);
        $labels = $response->getLabelAnnotations();
        $returnLabels = [];
        if ($labels) {
            //print("Labels:" . PHP_EOL);
            foreach ($labels as $label) {
                //print($label->getDescription() . PHP_EOL);
                if($label->getScore() >= 0.9){
                    $returnLabels[] = $label->getDescription();
                }
                //print($label->getScore() . PHP_EOL);
            }
        } else {
            //print('No label found' . PHP_EOL);
        }
        $imageAnnotator->close();
        return $returnLabels;
    }
}

