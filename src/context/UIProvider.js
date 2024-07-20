import { createContext, useContext, useState } from "react";

const UIContenxt = createContext({});
export const useUiContext = () => useContext(UIContenxt);

export const UIProvider = ({ children }) => {
    const [settingsModalEffect, setSettingsModalEffect] = useState(false);

    const value =
    {
        settingsModal: [settingsModalEffect, setSettingsModalEffect],
    };
    return (
        <UIContenxt.Provider value={value}>
            {children}
        </UIContenxt.Provider>
    )
}