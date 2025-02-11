import { Group, Stack } from "@mantine/core"
import { ShortInfoCard } from "../../components/ui/ShortInfoCard"
import { AnalyticsProvider } from "../../components/module"


export const Home = () => {

    return <>
        <Stack gap="xl">
            <Group justify="flex-start">
                <ShortInfoCard label="Total Projects" value={100} />
                <ShortInfoCard label="Unimplemented" value={59} />
                <ShortInfoCard label="Preparing" value={3} />
                <ShortInfoCard label="Bidding" value={4} />
                <ShortInfoCard label="On-Going" value={4} />
                <ShortInfoCard label="Completed" value={30} />
            </Group>
            <AnalyticsProvider />
        </Stack>
    </>
}