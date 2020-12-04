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

use App\Repository\KeepitRepository;
use App\Entity\Keepit;

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
        $tags = $requestContent['requestTags'];
        $imageIds = $requestContent['imageIds'];
        $user = $userRepository->login($requestContent['email'], $requestContent['password']);

        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $newKeepit = new Keepit();
        $newKeepit->setUser($user);
        
        if($tags){
            foreach($tags as $key => $value){
                $newTag = new Tag();
                $newTag->setValue($value['value']);
                $newTag->setIsCustom($value['isCustom']);
                $newTag->setUser($user);
                foreach($imageIds as $key => $value){
                    $newTag->setImage($imageRepository->findbyid($imageIds[$key]));
                }
                $newTag = $tagRepository->save($newTag);
                $newKeepit->addTag($newTag);
            }
        }
        $newAddedKeepit = $keepitRepository->save($newKeepit);
 
        foreach($imageIds as $key => $value){
            $image = $imageRepository->findbyid($imageIds[$key]);
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
        $response = new JsonResponse($keepits);


      
        $responseArr = array();

        foreach($keepits as $keepit){
            $tags = $keepit->getTags();
            $images = $keepit->getImage();
            foreach($images as $key => $image){
                // echo $image->getPath().'<br>';
                // $collectedImg[$key] = $image->getPath();
                $responseArr[$keepit->id]['images'][$key] = $image->getPath();
            }
            foreach($tags as $key => $tag){
                $responseArr[$keepit->id]['tags'][$key] = $tag->getValue();
                // echo $tag->getValue().'<br>';
            }

            if(count($tags) === 0){
                $responseArr[$keepit->id]['tags'] = 'Not tagged';
         
            }
        }

        /*
            $array = array(
                "foo" => "bar",
                42    => 24,
                "multi" => array(
                    "dimensional" => array(
                        "array" => "foo"
                    )
                )
            );
        */

       // var_dump(gettype($responseArr));

        //var_dump($responseArr);

        
        /*
        {
            keepit-ID: {
                images: {}
                tags: {}
            }
            keepit-ID: {
                images: {}
                tags: {}
            }
        }
        */
        $response = new JsonResponse($responseArr);
        return $response;
    

   

        // $keepits = $user->getKeepits();
        // var_dump($keepits);

        
        // $response = new JsonResponse($keepits);
        // return $response;
    }
}


