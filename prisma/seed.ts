import { PrismaClient } from '@prisma/client';
import shipmentsJson from './shipments.json';

const prisma = new PrismaClient();

const shipmentsData = shipmentsJson;

async function seed() {
    try {
        await prisma.shipment.deleteMany();

        for (const shipment of shipmentsData) {
            const cleanedStatus = shipment.status.replace(/'/g, '');

            const mappedShipment = {
                ...shipment,
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

seed();
