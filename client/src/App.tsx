import { useState, useEffect } from 'react';

function App() {
    const [message, setMessage] = useState('');

    const fetchShipments = async () => {
        const response = await fetch('/api/v1/shipments', {
            method: 'GET',
        });
        const data = await response.text();
        setMessage(data);
    };

    useEffect(() => {
        void fetchShipments();
    }, []);

    return (
        <main>
            <h1>Message: {message}</h1>
        </main>
    );
}

export default App;
