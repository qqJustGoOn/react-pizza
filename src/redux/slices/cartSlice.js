import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    totalPrice: 0,
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //action.payload = {payload}
        addItem(state, {payload}) {
            const findItem = state.items.find(obj => (obj.id === payload.id) &&
                (obj.size === payload.size) &&
                (obj.type === payload.type));

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({...payload, count: 1});
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        minusItem(state, {payload}) {
            const findItem = state.items.find(obj => (obj.id === payload.id) &&
                (obj.size === payload.size) &&
                (obj.type === payload.type));

            findItem && findItem.count--;
            state.totalPrice -= findItem.price;
        },
        removeItem(state, {payload}) {
            const findItem = state.items.find(obj => (obj.id === payload.id) &&
                (obj.size === payload.size) &&
                (obj.type === payload.type));

            state.totalPrice -= findItem.price * findItem.count;
            state.items = state.items.filter(obj => (obj.id !== payload.id) ||
                (obj.size !== payload.size) ||
                (obj.type !== payload.type));
        },
        clearItems(state, action) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state) => state.cart;
export const selectCartItemByParams = (id, activeType, activeSize) => (state) =>
    state.cart.items.find(obj =>
        obj.id === id &&
        obj.type === activeType &&
        obj.size === activeSize);
// Action creators are generated for each case reducer function
export const {
    addItem,
    minusItem,
    removeItem,
    clearItems
} = cartSlice.actions;

export default cartSlice.reducer;