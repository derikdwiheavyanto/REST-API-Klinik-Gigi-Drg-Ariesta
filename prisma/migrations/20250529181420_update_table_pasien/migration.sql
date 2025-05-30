/*
  Warnings:

  - You are about to drop the column `nik` on the `pasiens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[no_pasien]` on the table `pasiens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `no_pasien` to the `pasiens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `pasiens_nik_key` ON `pasiens`;

-- AlterTable
ALTER TABLE `pasiens` DROP COLUMN `nik`,
    ADD COLUMN `no_pasien` VARCHAR(14) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `pasiens_no_pasien_key` ON `pasiens`(`no_pasien`);
