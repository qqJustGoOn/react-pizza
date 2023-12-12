import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";

// Cоздаем `thunk`
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {category, search, sortBy, order, currentPage} = params;
        const {data} = await axios.get(`https://6538192ea543859d1bb13d9d.mockapi.io/items?page=${currentPage}&limit=4&${
            category}&sortBy=${sortBy}&order=${order}${search}`);
        return data;
    }
);

const initialState = {
    items: [],
    status: 'loading', //loading | success | error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, {payload}) {
            state.items = payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';
                state.items = [];
            })
    }
});

// Action creators are generated for each case reducer function
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;