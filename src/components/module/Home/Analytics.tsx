import { useContext } from "react"
import { AnalyticsContext } from "./Analytics.context"
import { Top10Projects } from "./Analytics/Top10Projects"
import { Analytics as Analytic } from "./Analytics/Analytics"
import { Top10Contractors } from "./Analytics/Top10Contractors"


export const Analytics = () => {
    const analyticsContext = useContext(AnalyticsContext)

    if (!analyticsContext) return null
    return <>
        {analyticsContext.tab == 0 ? <Analytic /> : null}
        {analyticsContext.tab == 1 ? <Top10Projects /> : null}
        {analyticsContext.tab == 2 ? <Top10Contractors /> : null}
    </>
}