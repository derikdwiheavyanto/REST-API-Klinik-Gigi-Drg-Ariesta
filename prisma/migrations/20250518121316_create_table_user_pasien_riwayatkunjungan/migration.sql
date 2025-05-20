-- CreateTable
CREATE TABLE `users` (
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pasiens` (
    `id_pasien` INTEGER NOT NULL AUTO_INCREMENT,
    `nik` VARCHAR(16) NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `alamat` VARCHAR(200) NULL,
    `no_hp` VARCHAR(20) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pasiens_nik_key`(`nik`),
    PRIMARY KEY (`id_pasien`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `riwayat_kunjungans` (
    `id_kunjungan` INTEGER NOT NULL AUTO_INCREMENT,
    `anamnesa` VARCHAR(191) NOT NULL,
    `diagnosa` VARCHAR(191) NOT NULL,
    `terapi` VARCHAR(191) NOT NULL,
    `catatan` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `id_pasien` INTEGER NOT NULL,

    PRIMARY KEY (`id_kunjungan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `riwayat_kunjungans` ADD CONSTRAINT `riwayat_kunjungans_id_pasien_fkey` FOREIGN KEY (`id_pasien`) REFERENCES `pasiens`(`id_pasien`) ON DELETE RESTRICT ON UPDATE CASCADE;
