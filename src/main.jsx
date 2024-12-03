import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AppContextWrapper from "./context/AppContextWrapper.jsx";

const clientId =
    "486500895418-f8j6bj86e167qr88r14aihm5vct733nt.apps.googleusercontent.com"; // Thay thế với Client ID của bạn từ Google Cloud Console

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GoogleOAuthProvider clientId={clientId}>
                    <AppContextWrapper>
                        <App />
                    </AppContextWrapper>
                </GoogleOAuthProvider>
            </PersistGate>
        </Provider>
    </StrictMode>
);
