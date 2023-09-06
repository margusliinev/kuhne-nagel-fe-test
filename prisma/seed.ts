import { PrismaClient } from '@prisma/client';
import shipmentsJson from './shipments.json';
require('dotenv').config();

const prisma = new PrismaClient();

const shipmentsData = shipmentsJson;

async function seed() {
    try {
        await prisma.shipment.deleteMany();

        for (const shipment of shipmentsData) {
            const cleanedStatus = shipment.status.replace(/'/g, '');

            const mappedShipment = {
                ...shipment,
                date: new Date(shipment.date),
                status: cleanedStatus,
            };

            await prisma.shipment.create({
                data: mappedShipment,
            });
        }

        console.log('Seed data inserted successfully.');
    } catch (err) {
        console.error('Error inserting seed data:', err);
    } finally {
        await prisma.$disconnect();
    }
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
