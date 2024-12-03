import { createContext, useState } from "react";

const DrawerContext = createContext();

const DrawerProvider = ({ children }) => {
    const [drawer, setDrawer] = useState(false);

    return (
        <DrawerContext.Provider value={{ drawer, setDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export { DrawerContext, DrawerProvider };
