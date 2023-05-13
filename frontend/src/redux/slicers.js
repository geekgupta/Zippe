import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    islogin: false,
    token : null 
}

export const counterSlice = createSlice({
    name: 'counter',
    token: null,
    initialState,
    reducers: {
        authenticated: (state) => {
            state.islogin = true;
        },
        logout: (state) => {
            state.islogin = false;
        },
        settoken: (state, action) => {
            state.token = action.payload;
        },

    },
})

// Action creators are generated for each case reducer function
export const { authenticated, logout, settoken } = counterSlice.actions

export default counterSlice.reducer