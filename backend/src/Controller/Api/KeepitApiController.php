<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

use App\Repository\ImageRepository;
use App\Entity\Image;

use App\Repository\UserRepository;
use App\Entity\User;

use App\Repository\TagRepository;
use App\Entity\Tag;
use App\Utils\VisionApi;

use App\Repository\KeepitRepository;
use App\Entity\Keepit;

use App\Utils\LocalFiles;
use App\Utils\GeoService;


class KeepitApiController extends AbstractController
{
    /**
     *
     * @Route("/keepit/add", methods={"POST"})
     */
    public function preload(
        Request $request, 
        ImageRepository $imageRepository, 
        TagRepository $tagRepository, 
        UserRepository $userRepository, 
        KeepitRepository $keepitRepository
        ) {

        $requestContent = json_decode($request->getContent(), true); 
        $tags = $requestContent['addedTags'];

        $imageIds = $requestContent['imageIds'];
        if ($imageIds === null) {
            return new JsonResponse(
                ["error" => "No image ids given"],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }


        $user = $userRepository->login($requestContent['email'], $requestContent['password']);
        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newKeepit = new Keepit();

        // GEO DATA
        $geoData = $requestContent['geolocation'];
        if(count($geoData) > 0){
            $latitude = $geoData[0];
            $longitude = $geoData[1];
            $url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='.$latitude.','.$longitude.'&sensor=false&key='.$_ENV['MAP_API_KEY'];
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
             } else{
               $city = null;
               $country = null;
             }
            $newKeepit->setCity($city);
            $newKeepit->setCountry($country);
            $newKeepit->setLatitude($latitude);
            $newKeepit->setLongitude($longitude);
        }

        // DATE
        $now = new \DateTime();
        $newKeepit->setDate($now);
        $newKeepit->setUser($user);
        $newKeepit->setRating($requestContent['rated']);

        // Tags
        if($tags){
            foreach($tags as $key => $value){
                $newTag = new Tag();
                $newTag->setValue($value['value']);
                $newTag->setIsCustom($value['isCustom']);
                $newTag->setUser($user);
                foreach($imageIds as $key => $value){
                    $newTag->setImage($imageRepository->findById($imageIds[$key]));
                }
                $newTag = $tagRepository->save($newTag);
                $newKeepit->addTag($newTag);
            }
        }

        // Update Image Status
        $newAddedKeepit = $keepitRepository->save($newKeepit);
        foreach($imageIds as $key => $value){
            $image = $imageRepository->findById($imageIds[$key]);
            $image->setKeepit($newAddedKeepit);
            $image->setSubmitted(true);
            $imageRepository->save($image);
        }

        $response = new JsonResponse($newAddedKeepit);
        return $response;
    }

    /**
     *
     * @Route("/keepit/getall", methods={"POST"})
     */
    public function getall(
        Request $request, 
        ImageRepository $imageRepository, 
        TagRepository $tagRepository, 
        UserRepository $userRepository, 
        KeepitRepository $keepitRepository
        ) {

        $requestContent = json_decode($request->getContent(), true); 

        $user = $userRepository->login($requestContent['email'], $requestContent['password']);
        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $keepits = $keepitRepository->findby(["user" => $user->getId()]);
        
        $responseArr = array();
        foreach($keepits as $key => $keepit){
            $tags = $keepit->getTags();
            $images = $keepit->getImage();
            $responseArr[$key]['rated'] = $keepit->getRating();

            $responseArr[$key]['city'] = $keepit->getCity();
            $responseArr[$key]['country'] = $keepit->getCountry();
            $responseArr[$key]['date'] = $keepit->getDate();


            $responseArr[$key]['id'] = $keepit->id;
            foreach($images as $imageKey => $image){
                $responseArr[$key]['images'][$imageKey] = $image->getPath();
            }
            foreach($tags as $tagKey => $tag){
                $responseArr[$key]['tags'][$tagKey] = array( 'value' => $tag->getValue(), 'isCustom' => $tag->getIsCustom() );
            }
            if(count($tags) === 0){
                $responseArr[$key]['tags'][] = array( 'value' => 'Not Tagged', 'isCustom' => false);
            }
        }
        $response = new JsonResponse($responseArr);
        return $response;
    }

     /**
     *
     * @Route("/keepit/delete/{id}", methods={"POST"})
     */
    public function removeKeepit(
        $id,
        Request $request, 
        ImageRepository $imageRepository, 
        TagRepository $tagRepository, 
        UserRepository $userRepository, 
        KeepitRepository $keepitRepository,
        LocalFiles $localFiles
        ) {

        $keepit = $keepitRepository->findOneBy(['id' => $id]);

        if ($keepit === null) {
            return new JsonResponse(
                ["error" => "Keepit not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $imageIdsToDelete = [];
        $images = $keepit->getImage();
        foreach($images as $image){
            $path = $image->getPath();
            $imageId = $image->getId();
            $imageIdsToDelete[] = $imageId;
            // var_dump($imageId);
            // var_dump($path);
            $keepit->removeImage($image);
            $localFiles->delete($path);
            // $thumbPath = str_replace('.jpeg', '-thumb.jpeg', $path);
            // $localFiles->delete($path);
            // if (file_exists($thumbPath)) {
            //     $localFiles->delete($thumbPath);
            // } 
        }
        
        $tags = $keepit->getTags();
        foreach($tags as $tag){
            $keepit->removeTag($tag);
            $tagRepository->delete($tag);
        }

        $keepitRepository->delete($keepit);

        foreach($imageIdsToDelete as $imageIdToDelete){
            $imageToDelete = $imageRepository->findOneBy(['id' => $imageIdToDelete]);
            $imageRepository->delete($imageToDelete);
        }

        return new JsonResponse(
            ["Status" => "Keepit deleted"],
            JsonResponse::HTTP_OK
        );

    }

    
}


