import { useEffect } from 'react';
import { getShipments } from './features/shipments/shipmentsSlice';
import { useAppSelector, useAppDispatch } from './hooks';
import ShipmentsTable from './components/ShipmentsTable';

function App() {
    const dispatch = useAppDispatch();
    const { shipments } = useAppSelector((store) => store.shipments);

    useEffect(() => {
        void dispatch(getShipments());
    }, [dispatch]);

    return (
        <main className='w-screen-90 mx-auto'>
            <h1 className='text-center text-4xl font-bold text-blue-900 uppercase mt-4 mb-2'>Kuehne+Nagel</h1>
            <h2 className='text-center text-lg font-semibold text-blue-900 mb-4'>Front-End Test Assignment</h2>
            <ShipmentsTable shipments={shipments} />
        </main>
    );
}

export default App;
