import { Injectable } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShipmentsService {
    constructor(private readonly prisma: PrismaService) {}
    create(createShipmentDto: CreateShipmentDto) {
        return this.prisma.shipment.create({ data: createShipmentDto });
    }

    findAll() {
        return this.prisma.shipment.findMany();
    }

    findOne(id: number) {
        return this.prisma.shipment.findUnique({ where: { id: id } });
    }

    update(id: number, updateShipmentDto: UpdateShipmentDto) {
        return this.prisma.shipment.update({ where: { id: id }, data: updateShipmentDto });
    }

    remove(id: number) {
        return this.prisma.shipment.delete({ where: { id: id } });
    }
}
