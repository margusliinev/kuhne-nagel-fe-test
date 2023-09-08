import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteShipment, updateShipment } from '../shipments/shipmentsSlice';
import { Shipment } from '@/types';
import axios from 'axios';

type ShipmentsState = {
    isLoading: boolean;
    isError: boolean;
    shipment: Shipment | null;
    shipmentDetails: {
        id: number;
        orderNo: string;
        date: Date;
        customer: string;
        trackingNo: string;
        status: string;
        consignee: string;
    };
};

const initialState: ShipmentsState = {
    isLoading: false,
    isError: false,
    shipment: null,
    shipmentDetails: {
        id: 0,
        orderNo: '',
        date: new Date(Date.now()),
        customer: '',
        trackingNo: '',
        status: '',
        consignee: '',
    },
};

const getShipmentById = createAsyncThunk('signleShipment/getShipmentById', async (id: number) => {
    const response = await axios<Shipment>(`/api/v1/shipments/${id}`);
    return response.data;
});

const updateShipmentById = createAsyncThunk(
    'signleShipment/updateShipmentById',
    async ({ id, updateShipmentDto }: { id: number; updateShipmentDto: Shipment }, thunkAPI) => {
        const response = await axios<Shipment>(`/api/v1/shipments/${id}`, {
            method: 'PATCH',
            data: updateShipmentDto,
        });
        thunkAPI.dispatch(updateShipment(updateShipmentDto));
        return response.data;
    },
);

const deleteShipmentById = createAsyncThunk('signleShipment/deleteShipmentById', async (id: number, thunkAPI) => {
    const response = await axios<Shipment>(`/api/v1/shipments/${id}`, {
        method: 'DELETE',
    });
    thunkAPI.dispatch(deleteShipment(id));
    return response.data;
});

const singleShipmentSlice = createSlice({
    name: 'singleShipment',
    initialState,
    reducers: {
        updateShipmentDetails: (
            state,
            { payload: { name, value } }: { payload: { name: keyof ShipmentsState['shipmentDetails']; value: string | Date } },
        ) => {
            if (name === 'date') {
                state.shipmentDetails.date = value as Date;
            }
            if (name !== 'date' && name !== 'id') {
                state.shipmentDetails[name] = value as string;
            }
        },
        updateShipmentDate: (state, { payload }: { payload: Date }) => {
            state.shipmentDetails.date = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getShipmentById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getShipmentById.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(getShipmentById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.shipment = action.payload;
                state.shipmentDetails = {
                    id: action.payload.id,
                    orderNo: action.payload.orderNo,
                    date: action.payload.date,
                    customer: action.payload.customer,
                    trackingNo: action.payload.trackingNo,
                    status: action.payload.status,
                    consignee: action.payload.consignee,
                };
            });
    },
});

export { getShipmentById, updateShipmentById, deleteShipmentById };
export const { updateShipmentDetails, updateShipmentDate } = singleShipmentSlice.actions;
export default singleShipmentSlice.reducer;
