import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //action.payload
        addItem(state, {payload}) {
            const findItem = state.items.find(obj => obj.id === payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...payload, count: 1,});
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        clearItems(state, action) {
            state.items = [];
        },

    },
});

// Action creators are generated for each case reducer function
export const {
    addItem,
    removeItem,
    clearItems
} = cartSlice.actions;

export default cartSlice.reducer;