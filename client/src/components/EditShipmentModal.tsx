import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Button } from '@/components/ui';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getShipmentById, updateShipmentDetails, updateShipmentDate, updateShipmentById } from '@/features/singleShipment/singleShipmentSlice';
import FormRowInput from './FormRowInput';
import FormRowSelect from './FormRowSelect';
import FormRowDate from './FormRowDate';
import { useState } from 'react';
import PageSpinner from './PageSpinner';
import { useToast } from '@/components/ui/use-toast';

const EditShipmentModal = ({ shipmentID }: { shipmentID: number }) => {
    const { toast } = useToast();
    const { shipmentDetails, isLoading } = useAppSelector((store) => store.singleShipment);
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(updateShipmentById({ id: shipmentID, updateShipmentDto: shipmentDetails })).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast({
                    title: 'Shipment Updated',
                });
            }
            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className='bg-emerald-600 text-white py-2 px-3 rounded-md font-medium hover:bg-emerald-700 transition-colors text-sm'
                onClick={() => dispatch(getShipmentById(shipmentID))}
            >
                Edit
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='font-medium uppercase text-sm text-primary/80'>Shipment Details</DialogTitle>
                </DialogHeader>
                {isLoading ? (
                    <div className='min-w-[300px] min-h-[300px] grid place-items-center'>
                        <PageSpinner />
                    </div>
                ) : (
                    <form className='grid sm:grid-cols-2 gap-6 my-4' onSubmit={handleSubmit}>
                        <FormRowInput
                            type='text'
                            name='orderNo'
                            id='orderNo'
                            label='orderNo'
                            value={shipmentDetails.orderNo}
                            handleChange={(e) => dispatch(updateShipmentDetails({ name: 'orderNo', value: e.target.value }))}
                        />
                        <FormRowDate
                            id='date'
                            label='date'
                            value={shipmentDetails.date ? new Date(shipmentDetails.date) : new Date()}
                            handleChange={(date) => dispatch(updateShipmentDate(date!))}
                        />
                        <FormRowInput
                            type='text'
                            id='customer'
                            name='customer'
                            label='customer'
                            value={shipmentDetails.customer}
                            handleChange={(e) => dispatch(updateShipmentDetails({ name: 'customer', value: e.target.value }))}
                        />
                        <FormRowInput
                            type='text'
                            id='trackingNo'
                            name='trackingNo'
                            label='trackingNo'
                            value={shipmentDetails.trackingNo}
                            handleChange={(e) => dispatch(updateShipmentDetails({ name: 'trackingNo', value: e.target.value }))}
                        />
                        <FormRowInput
                            type='text'
                            id='consignee'
                            name='consignee'
                            label='consignee'
                            value={shipmentDetails.consignee}
                            handleChange={(e) => dispatch(updateShipmentDetails({ name: 'consignee', value: e.target.value }))}
                        />
                        <FormRowSelect
                            name='status'
                            label='status'
                            value={shipmentDetails.status}
                            handleChange={(value) => dispatch(updateShipmentDetails({ name: 'status', value: value }))}
                        />
                        <Button type='submit' className='bg-emerald-600 w-20 hover:bg-emerald-700' size={'sm'}>
                            Update
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditShipmentModal;
