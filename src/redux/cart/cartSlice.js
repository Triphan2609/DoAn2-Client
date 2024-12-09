// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo trạng thái ban đầu cho giỏ hàng
const initialState = {
    items: [], // Chứa danh sách sản phẩm trong giỏ
};

// Tạo slice cho giỏ hàng
const cartSlice = createSlice({
    name: "createSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const product = action.payload;
            const existingProduct = state.items.find(
                (item) => item.slug === product.slug
            );

            if (existingProduct) {
                // Nếu sản phẩm đã có, tăng số lượng lên 1
                existingProduct.quantity += 1;
            } else {
                // Nếu sản phẩm chưa có, thêm vào giỏ
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            // Xóa sản phẩm khỏi giỏ hàng
            state.items = state.items.filter(
                (item) => item.slug !== action.payload.slug
            );
        },
        clearCart: (state) => {
            // Xóa tất cả sản phẩm trong giỏ hàng
            state.items = [];
        },
        updateQuantity(state, action) {
            const { productId, quantity } = action.payload;
            console.log(action.payload);
            const item = state.items.find(
                (item) => item.product_id === productId
            );
            if (item) {
                item.quantity = quantity;
            }
        },
    },
});

// Export các action để sử dụng
export const { addToCart, removeFromCart, clearCart, updateQuantity } =
    cartSlice.actions;

// Export reducer để sử dụng trong store
export default cartSlice.reducer;
