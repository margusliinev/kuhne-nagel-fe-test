import DeleteShipmentModal from './DeleteShipmentModal';
import EditShipmentModal from './EditShipmentModal';
import { Shipment } from '../types';

const ShipmentsTable = ({ shipments }: { shipments: Shipment[] }) => {
    return (
        <table className='w-full border-collapse shadow-md xl:table-fixed '>
            <TableHeader />
            <TableBody shipments={shipments} />
        </table>
    );
};

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80'>
                    orderNo
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80 hidden sm:table-cell'>
                    delivery date
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80'>
                    customer
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80 hidden lg:table-cell'>
                    trackingNo
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80 hidden md:table-cell'>
                    status
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80 hidden lg:table-cell'>
                    consignee
                </th>
                <th className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80'>
                    Modify
                </th>
            </tr>
        </thead>
    );
};

const TableBody = ({ shipments }: { shipments: Shipment[] }) => {
    return (
        <tbody>
            {shipments.map((shipment) => {
                return (
                    <tr key={shipment.id}>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm'>{shipment.orderNo}</td>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm hidden sm:table-cell'>
                            {new Date(shipment.date).toLocaleDateString()}
                        </td>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm'>{shipment.customer}</td>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm hidden lg:table-cell'>
                            {shipment.trackingNo}
                        </td>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm hidden md:table-cell'>
                            {shipment.status}
                        </td>
                        <td className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm hidden lg:table-cell'>
                            {shipment.consignee}
                        </td>
                        <td className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r'>
                            <div className='grid sm:flex items-center gap-2'>
                                <EditShipmentModal shipmentID={shipment.id} />
                                <DeleteShipmentModal shipmentID={shipment.id} />
                            </div>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
};

export default ShipmentsTable;
