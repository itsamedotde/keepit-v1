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

use App\Utils\LocalFiles;
use App\Utils\VisionApi;

class ImageApiController extends AbstractController
{
    /**
     *
     * @Route("/images/getTags/", methods={"POST"})
     */
    public function getTags(
        Request $request, 
        ImageRepository $imageRepository, 
        UserRepository $userRepository, 
        VisionApi $visionApiRepository
        ){

        $requestContent = json_decode($request->getContent(), true);

        $user = $userRepository->login($requestContent['email'], $requestContent['password']);
        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        // var_dump($requestContent['ids']);

        $imageIds = $requestContent['ids'];
        $imagelabels = [];

        foreach($imageIds as $imageId){
            $image = $imageRepository->findOneBy(['id' => $imageId]);
            $path = $image->getPath();
            // var_dump($path);
            $labels = $visionApiRepository->getLabels($path);
            foreach($labels as $label){
                $imagelabels[] = $label;
            }
        }
        // var_dump($imagelabels);
        // die;
        $collectedResponse['labels'] = $imagelabels;
        $response = new JsonResponse($collectedResponse);
        return $response;
    }

     /**
     *
     * @Route("/images/upload", methods={"POST"})
     */
    public function upload(
        Request $request, 
        SerializerInterface $serializer, 
        ImageRepository $imageRepository, 
        UserRepository $userRepository, 
        LocalFiles $localFiles, 
        VisionApi $visionApiRepository
        ){

        $requestContent = json_decode($request->getContent(), true);

        $user = $userRepository->login($requestContent['email'], $requestContent['password']);
        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $images = $requestContent['files'];
        $imagelabels = [];
      
        foreach($images as $image){
            $path = $localFiles->save($image); 
         
            $newImage = new Image();
            $newImage->setPath($path);
            $newImage->setSubmitted(false);
            $newImage->setUser($user);
            $savedImage = $imageRepository->save($newImage);
            $imageIds[] = $savedImage->id;
            // $labels = $visionApiRepository->getLabels($path);
            // foreach($labels as $label){
            //     $imagelabels[] = $label;
            // }
        }
     
        $collectedResponse['ids'] = $imageIds;
        // $collectedResponse['labels'] = $imagelabels;
    

        $response = new JsonResponse($collectedResponse);
        return $response;
    }

}
