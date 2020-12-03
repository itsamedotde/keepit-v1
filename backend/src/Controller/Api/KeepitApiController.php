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
        $user = $userRepository->login($requestContent['email'], $requestContent['password']);
        
        if ($user === null) {
            return new JsonResponse(
                ["error" => "User not found."],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $tags = $requestContent['requestTags'];
        $imageIds = $requestContent['imageIds'];

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

            $em = $this->getDoctrine()->getManager();
            $item = $imageRepository->findbyid($imageIds[$key]);
            $item->setKeepit($newAddedKeepit);
            $item->setSubmitted(true);
            $em->flush();
            
        }

        $response = new JsonResponse($newAddedKeepit);
        return $response;
    }
}


