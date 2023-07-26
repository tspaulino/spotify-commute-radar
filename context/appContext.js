import { createContext, useContext } from "react"

const AppContext = createContext(
    {
        auth: null,
        profile: null,
        artists: null,
        releases: null
    }
)

export function AppWrapper({ children }) {
    let state = {
        auth: null,
        profile: null,
        artists: null,
        releases: null
    }
    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext)
}