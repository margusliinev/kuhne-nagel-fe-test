import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteShipment, updateShipment } from '../shipments/shipmentsSlice';
import { Shipment, UpdateShipmentDto } from '@/types';
import axios from 'axios';

type ShipmentsState = {
    isLoading: boolean;
    isError: boolean;
    shipment: Shipment | null;
    shipmentDetails: {
        orderNo: string;
        date: string;
        customer: string;
        trackingNo: string;
        status: string;
        consignee: string;
    };
    isLoadingUpdate: boolean;
    isErrorUpdate: boolean;
};

const initialState: ShipmentsState = {
    isLoading: false,
    isError: false,
    shipment: null,
    shipmentDetails: {
        orderNo: '',
        date: '',
        customer: '',
        trackingNo: '',
        status: '',
        consignee: '',
    },
    isLoadingUpdate: false,
    isErrorUpdate: false,
};

const getShipmentById = createAsyncThunk('singleShipment/getShipmentById', async (id: number, thunkAPI) => {
    try {
        const response = await axios<Shipment>(`/api/v1/shipments/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});
const updateShipmentById = createAsyncThunk(
    'signleShipment/updateShipmentById',
    async ({ id, updateShipmentDto }: { id: number; updateShipmentDto: UpdateShipmentDto }, thunkAPI) => {
        try {
            const response = await axios<Shipment>(`/api/v1/shipments/${id}`, {
                method: 'PATCH',
                data: updateShipmentDto,
            });
            thunkAPI.dispatch(updateShipment({ ...updateShipmentDto, id }));
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    },
);

const deleteShipmentById = createAsyncThunk('signleShipment/deleteShipmentById', async (id: number, thunkAPI) => {
    try {
        const response = await axios<Shipment>(`/api/v1/shipments/${id}`, {
            method: 'DELETE',
        });
        thunkAPI.dispatch(deleteShipment(id));
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const singleShipmentSlice = createSlice({
    name: 'singleShipment',
    initialState,
    reducers: {
        updateShipmentDetails: (
            state,
            { payload: { name, value } }: { payload: { name: keyof ShipmentsState['shipmentDetails']; value: string } },
        ) => {
            state.shipmentDetails[name] = value;
        },
        updateShipmentDate: (state, { payload }: { payload: string }) => {
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
                    orderNo: action.payload.orderNo,
                    date: action.payload.date,
                    customer: action.payload.customer,
                    trackingNo: action.payload.trackingNo,
                    status: action.payload.status,
                    consignee: action.payload.consignee,
                };
            })
            .addCase(updateShipmentById.pending, (state) => {
                state.isLoadingUpdate = true;
            })
            .addCase(updateShipmentById.rejected, (state) => {
                state.isLoadingUpdate = false;
                state.isErrorUpdate = true;
            })
            .addCase(updateShipmentById.fulfilled, (state) => {
                state.isLoadingUpdate = false;
            });
    },
});

export { getShipmentById, updateShipmentById, deleteShipmentById };
export const { updateShipmentDetails, updateShipmentDate } = singleShipmentSlice.actions;
export default singleShipmentSlice.reducer;
