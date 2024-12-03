import { AnimalProvider } from "./animal.context";
import { DrawerProvider } from "./drawer.context";

// Tạo một Context Wrapper
const AppContextWrapper = ({ children }) => (
    <AnimalProvider>
        <DrawerProvider>{children}</DrawerProvider>
    </AnimalProvider>
);

export default AppContextWrapper;
