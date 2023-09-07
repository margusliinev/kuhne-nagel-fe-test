import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Shipment } from '@/components/types';
import axios from 'axios';

type ShipmentsState = {
    isLoading: boolean;
    isError: boolean;
    shipments: Shipment[];
    displayedShipments: Shipment[];
    page: number;
    count: number;
};

const initialState: ShipmentsState = {
    isLoading: false,
    isError: false,
    shipments: [],
    displayedShipments: [],
    page: 1,
    count: 10,
};

const getShipments = createAsyncThunk('shipments/getShipments', async () => {
    const response = await axios<Shipment[]>('/api/v1/shipments');
    return response.data;
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        changePage: (state, { payload }: { payload: number }) => {
            state.page = payload;
            state.displayedShipments = [...state.shipments.slice((payload - 1) * state.count, payload * state.count)];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShipments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getShipments.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getShipments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.shipments = [...action.payload];
                state.displayedShipments = [...action.payload.slice(0, state.count)];
            });
    },
});

export { getShipments };
export const { changePage } = shipmentsSlice.actions;
export default shipmentsSlice.reducer;
