import multer from "multer";
import path from "path";

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.resolve("uploads");
        cb(null, 'uploads/'); // Folder untuk menyimpan file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nama file unik
    },
});

const upload = multer({ storage });

export default upload;
