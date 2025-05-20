import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    // Optional: hapus data sebelumnya
    await prisma.user.deleteMany();
    await prisma.pasien.deleteMany();

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

    console.log('✅ Seeding user & pasien selesai!');
};

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    }).then(async () => {
        await prisma.$disconnect();
    })
