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

use App\Utils\LocalFiles;
use App\Utils\VisionApi;

class KeepitApiController extends AbstractController
{
    /**
     *
     * @Route("/keepit/add", methods={"POST"})
     */
    public function preload(
        Request $request, 
        SerializerInterface $serializer, 
        ImageRepository $imageRepository, 
        TagRepository $tagRepository, 

        UserRepository $userRepository, 
        KeepitRepository $keepitRepository, 
        LocalFiles $fileRepository,
        VisionApi $visionApiRepository
        ) {

        $requestContent = json_decode($request->getContent(), true);

        // User    
        $user = $userRepository->login($requestContent['email'], $requestContent['password']);

        // Tags
        $tags = $requestContent['responseTags'];

        // Image
        $imageIds = $requestContent['imageIds'];

        $newKeepit = new Keepit();
        $newKeepit->setUser($user);
        
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
      
        $theKeepit = $keepitRepository->save($newKeepit);
 
        // add keepit to image db
        foreach($imageIds as $key => $value){
            $em = $this->getDoctrine()->getManager();
            $item = $imageRepository->findbyid($imageIds[$key]);
            $item->setKeepit($theKeepit);
            $item->setSubmitted(true);

            $em->flush();
        }

        $response = new JsonResponse(true);
        return $response;
    }
}


