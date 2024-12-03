import { createContext, useState } from "react";

// Tạo context
const AnimalContext = createContext();

// Tạo Provider để cung cấp giá trị cho context
const AnimalProvider = ({ children }) => {
    // State để lưu trữ giá trị context
    const [filter, setFilter] = useState("Giá trị mặc định");

    // Cung cấp giá trị cho tất cả các component con
    return (
        <AnimalContext.Provider value={{ filter, setFilter }}>
            {children}
        </AnimalContext.Provider>
    );
};

export { AnimalContext, AnimalProvider };
