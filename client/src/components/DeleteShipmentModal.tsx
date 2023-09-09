import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui';
import { useAppDispatch } from '@/hooks';
import { deleteShipmentById } from '@/features/singleShipment/singleShipmentSlice';

const DeleteShipmentModal = ({ shipmentID }: { shipmentID: number }) => {
    const dispatch = useAppDispatch();

    return (
        <AlertDialog>
            <AlertDialogTrigger className='bg-destructive hover:bg-destructive/90 text-white font-medium  text-sm py-2 px-3 rounded-md'>
                Delete
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className='text-neutral-600'>
                        This action cannot be undone. This will permanently delete the shipment data from the server.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className='bg-destructive hover:bg-destructive/90' onClick={() => dispatch(deleteShipmentById(shipmentID))}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteShipmentModal;
