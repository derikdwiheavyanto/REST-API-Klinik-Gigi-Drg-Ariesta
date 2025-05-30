/*
  Warnings:

  - Added the required column `tanggal_kunjungan` to the `riwayat_kunjungans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `riwayat_kunjungans` ADD COLUMN `tanggal_kunjungan` DATETIME(3) NOT NULL;
