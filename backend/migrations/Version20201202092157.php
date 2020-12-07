<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20201202092157 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, image_id INT DEFAULT NULL, user_id INT DEFAULT NULL, value VARCHAR(255) NOT NULL, INDEX IDX_389B7833DA5256D (image_id), INDEX IDX_389B783A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag_keepit (tag_id INT NOT NULL, keepit_id INT NOT NULL, INDEX IDX_D03CE581BAD26311 (tag_id), INDEX IDX_D03CE5819BE7F55E (keepit_id), PRIMARY KEY(tag_id, keepit_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE tag ADD CONSTRAINT FK_389B7833DA5256D FOREIGN KEY (image_id) REFERENCES image (id)');
        $this->addSql('ALTER TABLE tag ADD CONSTRAINT FK_389B783A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE tag_keepit ADD CONSTRAINT FK_D03CE581BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE tag_keepit ADD CONSTRAINT FK_D03CE5819BE7F55E FOREIGN KEY (keepit_id) REFERENCES keepit (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE tag_keepit DROP FOREIGN KEY FK_D03CE581BAD26311');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE tag_keepit');
    }
}
