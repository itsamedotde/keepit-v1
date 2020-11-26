<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201126111230 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE images_categories (images_id INT NOT NULL, categories_id INT NOT NULL, INDEX IDX_8B556BE7D44F05E5 (images_id), INDEX IDX_8B556BE7A21214B7 (categories_id), PRIMARY KEY(images_id, categories_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE images_labels (images_id INT NOT NULL, labels_id INT NOT NULL, INDEX IDX_772BC557D44F05E5 (images_id), INDEX IDX_772BC557B8478C02 (labels_id), PRIMARY KEY(images_id, labels_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE images_categories ADD CONSTRAINT FK_8B556BE7D44F05E5 FOREIGN KEY (images_id) REFERENCES images (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE images_categories ADD CONSTRAINT FK_8B556BE7A21214B7 FOREIGN KEY (categories_id) REFERENCES categories (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE images_labels ADD CONSTRAINT FK_772BC557D44F05E5 FOREIGN KEY (images_id) REFERENCES images (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE images_labels ADD CONSTRAINT FK_772BC557B8478C02 FOREIGN KEY (labels_id) REFERENCES labels (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE images_categories');
        $this->addSql('DROP TABLE images_labels');
    }
}
