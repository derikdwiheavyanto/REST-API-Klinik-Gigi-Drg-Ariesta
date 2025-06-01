import ExcelJs from "exceljs"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";


export const generateExcel = async ({ pasienWithRiwayat }) => {
    const workbook = new ExcelJs.Workbook()

    const wsPasien = workbook.addWorksheet('Data Pasien');
    wsPasien.columns = [
        { header: 'No', key: 'no', width: 5 },
        { header: 'No Pasien', key: 'no_pasien', width: 15 },
        { header: 'Nama', key: 'nama', width: 25 },
        { header: 'Alamat', key: 'alamat', width: 30 },
        { header: 'No HP', key: 'no_hp', toString: (value) => value.toString(), width: 20 },
        { header: 'Umur', key: 'umur', width: 10 },
    ];

    const wsRiwayat = workbook.addWorksheet('Riwayat Kunjungan');
    wsRiwayat.columns = [
        { header: 'No', key: 'no', width: 5 },
        { header: 'No Pasien', key: 'no_pasien', width: 20 },
        { header: 'Tanggal Kunjungan', key: 'tanggal', width: 20 },
        { header: 'Anamnesa', key: 'anamnesa', width: 30 },
        { header: 'Diagnosa', key: 'diagnosa', width: 30 },
        { header: 'Terapi', key: 'terapi', width: 30 },
        { header: 'Catatan', key: 'catatan', width: 30 },
        { header: 'Gambar', key: 'gambar', width: 30 },
    ];

    wsRiwayat.columns.forEach((column) => {
        column.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Style header Riwayat
    wsRiwayat.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 12 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4F81BD' }, // Biru
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });

    // Style header Pasien
    wsPasien.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 14 };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF9BBB59' }, // Hijau
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });




    let noPasien = 1;
    let noKunjungan = 1;

    for (const pasien of pasienWithRiwayat) {
        const rowPasien = wsPasien.addRow({
            no: noPasien++,
            no_pasien: pasien.no_pasien,
            nama: pasien.nama,
            alamat: pasien.alamat || "-",
            no_hp: pasien.no_hp ? String(pasien.no_hp) : "-",
            umur: pasien.umur || "-",
        });

        wsPasien.getRow(rowPasien.number).eachCell((cell) => {
            cell.font = { size: 12 };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        for (const kunjungan of pasien.riwayat_kunjungan) {
            const row = wsRiwayat.addRow({
                no: noKunjungan,
                no_pasien: pasien.no_pasien,
                tanggal: kunjungan.tanggal_kunjungan,
                anamnesa: kunjungan.anamnesa,
                diagnosa: kunjungan.diagnosa,
                terapi: kunjungan.terapi,
                catatan: kunjungan.catatan || '-',
                gambar: kunjungan.image ? "✔" : "-",
            },);

            wsRiwayat.getRow(row.number).eachCell((cell) => {
                cell.font = { size: 12 };
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });

            if (kunjungan.image) {
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);

                const imageFileName = path.basename(kunjungan.image);
                const imagePath = path.resolve(__dirname, '../../../uploads', imageFileName);
                if (fs.existsSync(imagePath)) {
                    const imageId = workbook.addImage({
                        filename: imagePath,
                        extension: path.extname(imagePath).slice(1),
                    });
                    wsRiwayat.getRow(row.number).height = 200
                    wsRiwayat.addImage(imageId, {
                        tl: { col: 7.2, row: row.number - 1 + 0.05 },
                        ext: { width: 200, height: 200 },
                    });
                }
            }

            noKunjungan++;

        }


    }
    return workbook
}