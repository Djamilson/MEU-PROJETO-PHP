/*
  Warnings:

  - A unique constraint covering the columns `[current_grad_id]` on the table `persons` will be added. If there are existing duplicate values, this will fail.
  - Made the column `person_id` on table `persons_posts_grads` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `persons_posts_grads` DROP FOREIGN KEY `person_post_grad_id_fkey`;

-- DropIndex
DROP INDEX `person_post_grad_id_fkey` ON `persons_posts_grads`;

-- AlterTable
ALTER TABLE `persons` ADD COLUMN `current_grad_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `persons_posts_grads` MODIFY `person_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `persons_current_grad_id_key` ON `persons`(`current_grad_id`);

-- AddForeignKey
ALTER TABLE `persons` ADD CONSTRAINT `persons_current_grad_id_fkey` FOREIGN KEY (`current_grad_id`) REFERENCES `persons_posts_grads`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persons_posts_grads` ADD CONSTRAINT `person_post_grad_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
