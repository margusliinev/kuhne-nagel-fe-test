import { configureStore } from '@reduxjs/toolkit';
import shipmentsReducer from './features/shipments/shipmentsSlice';

export const store = configureStore({
    reducer: {
        shipments: shipmentsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
