import React, { createContext, useContext, useState } from 'react';
import useAdaptive from "../../shared/libs/hooks/useAdaptive";
import useAddress from "./hooks/useAddress";
import useAuth from "./hooks/useAuth";
import useAdmin from "./hooks/useAdmin";
import useNotes from "./hooks/useNotes";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export function AppContextProvider({ children }) {

    const adaptiveHandler = useAdaptive();
    const authHandler = useAuth();
    const adminHandler = useAdmin();
    const addressHandler = useAddress();
    const notesHandler = useNotes();

    return (
        <AppContext.Provider
            value={{
                adaptiveHandler,
                addressHandler,
                authHandler,
                adminHandler,
                notesHandler,
            }
        }>
            {children}
        </AppContext.Provider>
    );
}
