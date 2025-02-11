import { FloatingIndicator } from "../../ui"
import { Analytics } from "./Analytics"
import { AnalyticsProvider as AnalyticProvider } from "./Analytics.context"

export const AnalyticsProvider = () => {

    return <>
        <AnalyticProvider>
            <FloatingIndicator />
            <Analytics />
        </AnalyticProvider>
    </>
}