import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

interface AnalyticsContextType {
    tab: number;
    setTab: Dispatch<SetStateAction<number>>; // Correct type for setTab
  }
  
// eslint-disable-next-line react-refresh/only-export-components
export const AnalyticsContext = createContext<AnalyticsContextType>({
    tab: 0,
    setTab: () => {}
})

export const AnalyticsProvider = (props: { children: ReactNode }) => {

    const [tab, setTab] = useState(0)

    return <>
        <AnalyticsContext.Provider value={{ tab, setTab }}>
            {props.children}
        </AnalyticsContext.Provider>
    </>
}