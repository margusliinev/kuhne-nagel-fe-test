import { configureStore } from '@reduxjs/toolkit';
import shipmentsReducer from './features/shipments/shipmentsSlice';
import singleShipmentReducer from './features/singleShipment/singleShipmentSlice';

export const store = configureStore({
    reducer: {
        shipments: shipmentsReducer,
        singleShipment: singleShipmentReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
