import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Shipment } from '@/types';
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

const getShipments = createAsyncThunk('shipments/getShipments', async (_, thunkAPI) => {
    try {
        const response = await axios<Shipment[]>('/api/v1/shipments');
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const shipmentsSlice = createSlice({
    name: 'shipments',
    initialState,
    reducers: {
        changePage: (state, { payload }: { payload: number }) => {
            state.page = payload;
            state.displayedShipments = [...state.shipments.slice((payload - 1) * state.count, payload * state.count)];
        },
        deleteShipment: (state, { payload }: { payload: number }) => {
            state.shipments = state.shipments.filter((shipment) => shipment.id !== payload);
            state.displayedShipments = state.shipments.slice((state.page - 1) * state.count, state.page * state.count);
        },
        updateShipment: (state, { payload }: { payload: Shipment }) => {
            state.shipments = state.shipments.map((shipment) => (shipment.id === payload.id ? payload : shipment));
            state.displayedShipments = state.shipments.slice((state.page - 1) * state.count, state.page * state.count);
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
                state.displayedShipments = state.shipments.slice(0, state.count);
            });
    },
});

export { getShipments };
export const { changePage, deleteShipment, updateShipment } = shipmentsSlice.actions;
export default shipmentsSlice.reducer;
