import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Optional: hapus data sebelumnya
    await prisma.user.deleteMany();
    await prisma.riwayatKunjungan.deleteMany();
    await prisma.pasien.deleteMany();
    await prisma.$executeRawUnsafe(`ALTER TABLE pasiens AUTO_INCREMENT = 1`);
    // await prisma.$executeRawUnsafe(`ALTER TABLE riwayat_kunjungans AUTO_INCREMENT = 1`);

    // Tambah user admin dengan hash password
    await prisma.user.create({
        data: {
            username: 'admin',
            password: await bcrypt.hash('admin', 10),
        },
    });

    // Tambah data pasien dummy
    await prisma.pasien.createMany({
        data: [
            {
                nik: '3201010101010001',
                nama: 'Ahmad Fauzi',
                alamat: 'Jl. Merpati No. 1, Bandung',
                no_hp: '081234567891',
                is_deleted: false,
            },
            {
                nik: '3201010101010002',
                nama: 'Siti Rahma',
                alamat: 'Jl. Kenanga No. 2, Bandung',
                no_hp: '081234567892',
                is_deleted: false,
            },
            {
                nik: '3201010101010003',
                nama: 'Budi Santoso',
                alamat: 'Jl. Melati No. 3, Bandung',
                no_hp: '081234567893',
                is_deleted: false,
            },
            {
                nik: '3201010101010004',
                nama: 'Dewi Lestari',
                alamat: 'Jl. Mawar No. 4, Bandung',
                no_hp: '081234567894',
                is_deleted: false,
            },
            {
                nik: '3201010101010005',
                nama: 'Rudi Hartono',
                alamat: 'Jl. Anggrek No. 5, Bandung',
                no_hp: '081234567895',
                is_deleted: false,
            },
        ],
    });

    await prisma.riwayatKunjungan.createMany({
        data: [
            // 📅 Sebelum bulan Mei (April)
            {
                id_pasien: 1,
                anamnesa: 'Pusing ringan',
                diagnosa: 'Kelelahan',
                terapi: 'Vitamin',
                catatan: 'Tidur cukup',
                image: 'april1.jpg',
                created_at: new Date('2025-04-20'),
                updated_at: new Date('2025-04-20'),
            },

            // 📅 Bulan Mei tapi sebelum minggu ini (20–26 Mei)
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Mual',
                diagnosa: 'Masuk angin',
                terapi: 'Obat lambung',
                catatan: 'Makan teratur',
                image: 'mei1.jpg',
                created_at: new Date('2025-05-05'),
                updated_at: new Date('2025-05-05'),
            },

            // 📅 Minggu ini (20–26 Mei 2025)
            {
                id_pasien: 1,
                anamnesa: 'Demam',
                diagnosa: 'Infeksi virus',
                terapi: 'Parasetamol',
                catatan: 'Minum air putih',
                image: 'minggu1.jpg',
                created_at: new Date('2025-05-22'),
                updated_at: new Date('2025-05-22'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Sakit tenggorokan',
                diagnosa: 'Radang tenggorokan',
                terapi: 'Antibiotik',
                catatan: 'Hindari makanan dingin',
                image: 'minggu2.jpg',
                created_at: new Date('2025-05-23'),
                updated_at: new Date('2025-05-23'),
            },
            {
                id_pasien: 1,
                anamnesa: 'Flu berat',
                diagnosa: 'Influenza',
                terapi: 'Obat flu',
                catatan: 'Istirahat',
                image: 'minggu3.jpg',
                created_at: new Date('2025-05-24'),
                updated_at: new Date('2025-05-24'),
            },
            {
                id_pasien: 1,
                anamnesa: 'Demam',
                diagnosa: 'Infeksi virus',
                terapi: 'Parasetamol',
                catatan: 'Minum air putih',
                image: 'minggu1.jpg',
                created_at: new Date('2025-05-22'),
                updated_at: new Date('2025-05-22'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Sakit tenggorokan',
                diagnosa: 'Radang tenggorokan',
                terapi: 'Antibiotik',
                catatan: 'Hindari makanan dingin',
                image: 'minggu2.jpg',
                created_at: new Date('2025-05-23'),
                updated_at: new Date('2025-05-23'),
            },
            {
                id_pasien: 1,
                anamnesa: 'Flu berat',
                diagnosa: 'Influenza',
                terapi: 'Obat flu',
                catatan: 'Istirahat',
                image: 'minggu3.jpg',
                created_at: new Date('2025-05-24'),
                updated_at: new Date('2025-05-24'),
            },
        ],
    });

    console.log('✅ Seeding user & pasien selesai!');
};

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    }).then(async () => {
        await prisma.$disconnect();
    })
