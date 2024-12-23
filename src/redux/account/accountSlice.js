import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    isLoginWithGoogle: false,
    user: {
        email: "",
        name: "",
        phone: "",
        address: "",
        role: "",
        user_id: "",
    },
};

export const accountSlide = createSlice({
    name: "accountSlide",
    initialState,
    reducers: {
        doLoginAction: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doUpdateAction: (state, action) => {
            state.user = action.payload;
        },
        doLoginWithGoogle: (state) => {
            state.isLoginWithGoogle = true;
        },

        doLogoutAction: (state) => {
            localStorage.removeItem("access_token");
            state.isAuthenticated = false;
            state.isLoginWithGoogle = false;
            state.user = {
                email: "",
                name: "",
                phone: "",
                address: "",
                role: "",
                user_id: "",
            };
        },
    },
});

export const selectIsAuthenticated = (state) =>
    state.accountSlide.isAuthenticated;

export const {
    doLoginAction,
    doLoginWithGoogle,
    doLogoutAction,
    doUpdateAction,
} = accountSlide.actions;

export default accountSlide.reducer;
