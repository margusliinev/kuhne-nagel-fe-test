import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Shipment } from '@/components/types';

type ShipmentsState = {
    isLoading: boolean;
    isError: boolean;
    error: string | null;
    shipments: Shipment[];
    page: number;
    count: number;
};

const initialState: ShipmentsState = {
    isLoading: false,
    isError: false,
    error: null,
    shipments: [],
    page: 1,
    count: 10,
};

const getShipments = createAsyncThunk<Shipment[]>('shipments/getShipments', async () => {
    const response = await axios('/api/v1/shipments');
    console.log(response.data);
    return response.data;
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {},
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
            });
    },
});

export { getShipments };
export default shipmentsSlice.reducer;
