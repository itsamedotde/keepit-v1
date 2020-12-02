<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
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
    private $value;

    /**
     * @ORM\ManyToOne(targetEntity=Image::class, inversedBy="tags")
     */
    private $image;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="tags")
     */
    private $user;

    /**
     * @ORM\ManyToMany(targetEntity=Keepit::class, inversedBy="tags",cascade={"persist"})
     */
    private $keepit;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isCustom;

    public function __construct()
    {
        $this->keepit = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }

    public function getImage(): ?Image
    {
        return $this->image;
    }

    public function setImage(?Image $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Keepit[]
     */
    public function getKeepit(): Collection
    {
        return $this->keepit;
    }

    public function addKeepit(Keepit $keepit): self
    {
        if (!$this->keepit->contains($keepit)) {
            $this->keepit[] = $keepit;
        }

        return $this;
    }

    public function removeKeepit(Keepit $keepit): self
    {
        $this->keepit->removeElement($keepit);

        return $this;
    }

    public function getIsCustom(): ?bool
    {
        return $this->isCustom;
    }

    public function setIsCustom(?bool $isCustom): self
    {
        $this->isCustom = $isCustom;

        return $this;
    }
}
