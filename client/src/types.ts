export type Shipment = {
    id: number;
    orderNo: string;
    date: string;
    customer: string;
    trackingNo: string;
    status: string;
    consignee: string;
};

export type UpdateShipmentDto = {
    orderNo: string;
    date: string;
    customer: string;
    trackingNo: string;
    status: string;
    consignee: string;
};
