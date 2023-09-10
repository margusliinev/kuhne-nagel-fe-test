import { useEffect } from 'react';
import { getShipments } from './features/shipments/shipmentsSlice';
import { useAppSelector, useAppDispatch } from './hooks';
import ShipmentsTable from './components/ShipmentsTable';
import ShipmentsPagination from './components/ShipmentsPagination';
import PageSpinner from './components/PageSpinner';

function App() {
    const dispatch = useAppDispatch();
    const { displayedShipments, shipments, count, isLoading, isError } = useAppSelector((store) => store.shipments);

    const pages = Array.from({ length: Math.ceil(shipments.length / count) }, (_, index) => {
        return index + 1;
    });

    useEffect(() => {
        void dispatch(getShipments());
    }, [dispatch]);

    if (isLoading) {
        return (
            <main className='w-screen h-screen grid place-items-center'>
                <PageSpinner />
            </main>
        );
    }

    if (isError) {
        return (
            <main className='w-screen h-screen grid place-items-center'>
                <header>
                    <h1 className='text-center text-4xl font-bold text-blue-900 uppercase mt-4 mb-2'>Kuehne+Nagel</h1>
                    <h2 className='text-center text-lg font-semibold text-blue-900 mb-4'>Front-End Assignment</h2>
                    <h1 className='text-4xl font-semibold text-red-500'>Error fetching shipments info</h1>
                </header>
            </main>
        );
    }

    return (
        <main className='w-screen-90 mx-auto'>
            <header>
                <h1 className='text-center text-4xl font-bold text-blue-900 uppercase mt-4 mb-2'>Kuehne+Nagel</h1>
                <h2 className='text-center text-lg font-semibold text-blue-900 mb-4 lg:mb-0'>Front-End Assignment</h2>
            </header>
            <h3 className='text-lg font-medium text-right mb-2 hidden lg:block'>Total Shipments: {shipments.length}</h3>
            <ShipmentsTable shipments={displayedShipments} />
            <ShipmentsPagination pages={pages} />
        </main>
    );
}

export default App;
