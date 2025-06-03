import dayjs from "dayjs";
import { prismaClient } from "../../application/database.js";

export const generateNoPasien = async () => {
    const today = dayjs().format("YYYYMMDD");

    const countToday = await prismaClient.pasien.count({
        where: {
            created_at: {
                gte: new Date(dayjs().startOf("day").toISOString()),
                lt: new Date(dayjs().endOf("day").toISOString())
            }
        }
    });

    const sequence = (countToday + 1).toString().padStart(3, "0"); // 001, 002, ...
    return `PSN${today}${sequence}`; // hasil: PSN20250530001
};