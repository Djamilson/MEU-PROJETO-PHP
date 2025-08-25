/*
  Warnings:

  - A unique constraint covering the columns `[user_id,scale_car_id]` on the table `scales_cars_users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `scales_cars_users` DROP FOREIGN KEY `scales_cars_users_scale_car_id_fkey`;

-- DropForeignKey
ALTER TABLE `scales_cars_users` DROP FOREIGN KEY `scales_cars_users_user_id_fkey`;

-- DropIndex
DROP INDEX `scales_cars_users_scale_car_id_fkey` ON `scales_cars_users`;

-- CreateTable
CREATE TABLE `persons_posts_grads` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `post_grad_id` VARCHAR(191) NOT NULL,
    `person_id` VARCHAR(191) NULL,

    INDEX `persons_posts_grads_id_person_id_post_grad_id_idx`(`id`, `person_id`, `post_grad_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `scales_cars_users_user_id_scale_car_id_key` ON `scales_cars_users`(`user_id`, `scale_car_id`);

-- AddForeignKey
ALTER TABLE `scales_cars_users` ADD CONSTRAINT `scale_car_user_scale_car_id_fkey` FOREIGN KEY (`scale_car_id`) REFERENCES `scales_cars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scales_cars_users` ADD CONSTRAINT `scale_car_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persons_posts_grads` ADD CONSTRAINT `person_pos_grad_id_fkey` FOREIGN KEY (`post_grad_id`) REFERENCES `post_grad`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `persons_posts_grads` ADD CONSTRAINT `person_post_grad_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
