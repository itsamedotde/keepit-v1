<?php

namespace App\Entity;

use App\Repository\TokenRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TokenRepository::class)
 */
class Token
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $tokenvalue;

    /**
     * @ORM\Column(type="datetime")
     */
    private $validuntil;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="token", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTokenvalue(): ?string
    {
        return $this->tokenvalue;
    }

    public function setTokenvalue(string $tokenvalue): self
    {
        $this->tokenvalue = $tokenvalue;

        return $this;
    }

    public function getValiduntil(): ?\DateTimeInterface
    {
        return $this->validuntil;
    }

    public function setValiduntil(\DateTimeInterface $validuntil): self
    {
        $this->validuntil = $validuntil;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
