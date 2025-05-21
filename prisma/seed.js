import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Optional: hapus data sebelumnya
    await prisma.user.deleteMany();
    await prisma.pasien.deleteMany();
    await prisma.riwayatKunjungan.deleteMany();
    await prisma.$executeRawUnsafe(`ALTER TABLE pasiens AUTO_INCREMENT = 1`);

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
            {
                id_pasien: 1,
                anamnesa: 'Sakit kepala hebat',
                diagnosa: 'Migrain',
                terapi: 'Paracetamol',
                catatan: 'Istirahat cukup',
                image: 'gambar1.jpg',
                created_at: new Date('2023-01-01'),
                updated_at: new Date('2023-01-01'),
            },
            {
                id_pasien: 1,
                anamnesa: 'Demam dan flu',
                diagnosa: 'Influenza',
                terapi: 'Antihistamin',
                catatan: 'Minum air hangat',
                image: 'gambar2.jpg',
                created_at: new Date('2023-02-10'),
                updated_at: new Date('2023-02-10'),
            },
            {
                id_pasien: 1,
                anamnesa: 'Batuk kering',
                diagnosa: 'Bronkitis ringan',
                terapi: 'Obat batuk',
                catatan: 'Jangan minum es',
                image: 'gambar3.jpg',
                created_at: new Date('2023-03-15'),
                updated_at: new Date('2023-03-15'),
            },

            // Data untuk pasien ID 2
            {
                id_pasien: 2,
                anamnesa: 'Sakit gigi berdenyut',
                diagnosa: 'Infeksi akar',
                terapi: 'Antibiotik & tambal',
                catatan: 'Kontrol seminggu',
                image: 'gigi1.jpg',
                created_at: new Date('2023-04-01'),
                updated_at: new Date('2023-04-01'),
            },
            {
                id_pasien: 2,
                anamnesa: 'Gusi bengkak',
                diagnosa: 'Gingivitis',
                terapi: 'Pembersihan karang gigi',
                catatan: 'Sikat gigi rutin',
                image: 'gigi2.jpg',
                created_at: new Date('2023-04-20'),
                updated_at: new Date('2023-04-20'),
            },
        ]
    })

    console.log('✅ Seeding user & pasien selesai!');
};

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    }).then(async () => {
        await prisma.$disconnect();
    })
