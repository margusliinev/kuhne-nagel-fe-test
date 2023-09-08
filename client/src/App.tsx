import { useEffect } from 'react';
import { getShipments } from './features/shipments/shipmentsSlice';
import { useAppSelector, useAppDispatch } from './hooks';
import ShipmentsTable from './components/ShipmentsTable';
import ShipmentsPagination from './components/ShipmentsPagination';

function App() {
    const dispatch = useAppDispatch();
    const { displayedShipments, shipments, count } = useAppSelector((store) => store.shipments);

    const pages = Array.from({ length: Math.ceil(shipments.length / count) }, (_, index) => {
        return index + 1;
    });

    useEffect(() => {
        void dispatch(getShipments());
    }, [dispatch]);

    return (
        <main className='w-screen-90 mx-auto'>
            <header>
                <h1 className='text-center text-4xl font-bold text-blue-900 uppercase mt-4 mb-2'>Kuehne+Nagel</h1>
                <h2 className='text-center text-lg font-semibold text-blue-900'>Front-End Test Assignment</h2>
            </header>
            <h3 className='text-lg font-medium text-right mb-2'>Total Shipments: {shipments.length}</h3>
            <ShipmentsTable shipments={displayedShipments} />
            <ShipmentsPagination pages={pages} />
        </main>
    );
}

export default App;
