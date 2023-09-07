import { Shipment } from './types';

const TableHeader = ({ columns }: { columns: string[] }) => {
    return (
        <thead>
            {columns.map((column) => {
                return (
                    <th
                        className='border-y border-border text-left py-4 px-2 first-of-type:border-l last-of-type:border-r uppercase font-medium text-sm bg-primary-foreground text-primary/80'
                        key={column}
                    >
                        {column === 'date' ? 'Delivery Date' : column}
                    </th>
                );
            })}
        </thead>
    );
};

const TableBody = ({ shipments, columns }: { shipments: Shipment[]; columns: string[] }) => {
    return (
        <tbody>
            {shipments.map((shipment) => {
                return (
                    <tr key={shipment.id}>
                        {columns.map((column) => {
                            if (column === 'date') {
                                return (
                                    <td key={column} className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm'>
                                        {new Date(shipment[column as keyof Shipment]).toLocaleDateString()}
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={column} className='border last-of-type:border-r border-border text-left py-4 px-2 text-sm'>
                                        {String(shipment[column as keyof Shipment])}
                                    </td>
                                );
                            }
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

const ShipmentsTable = ({ shipments }: { shipments: Shipment[] }) => {
    const columns = ['orderNo', 'date', 'customer', 'trackingNo', 'status', 'consignee'];
    return (
        <div>
            <table className='table-fixed w-full border-collapse'>
                <TableHeader columns={columns} />
                <TableBody shipments={shipments} columns={columns} />
            </table>
        </div>
    );
};

export default ShipmentsTable;
