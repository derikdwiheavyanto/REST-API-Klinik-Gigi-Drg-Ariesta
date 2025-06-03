import { prismaClient } from "../../application/database.js";


export const checkDeletedPasien = async (idPasien) => {

    const checkIsDeleted = await prismaClient.pasien.findUnique({
        where: {
            id_pasien: idPasien
        }
    });

    if (!checkIsDeleted || checkIsDeleted.is_deleted) {
        return true
    }

    return false
}