import { Group, Paper, Progress, rem, Stack, Text } from "@mantine/core"
import { BarChart } from "@mantine/charts"
import { projectCategoryMock } from "../../../../pages/Core/mock/HomeProjectCategoryBarChart"

export const Analytics = () => {

    return <>
        <Group gap="md" align="flex-start">
            <Paper withBorder p="md">
                <Text fw={700} size="lg" lts={0.4}>Project Type</Text>
                <BarChart
                    h={470}
                    w={rem(900)}
                    data={projectCategoryMock}
                    dataKey="projectType"
                    series={[
                        { name: 'Top1', label: "Quantum Pulse Engine Development" ,color: 'violet.6' },
                        { name: 'Top2', label: "EcoSmart Waste Management Systems", color: 'blue.6' },
                        { name: 'Top3', label: "AeroVision Advanced Drone Technologies", color: 'teal.6' },
                    ]}
                    tickLine="none"
                    gridAxis="none"
                    withXAxis={false}
                />
            </Paper>
            <Paper w={rem(350)} withBorder p="md">
                <Text fw={700} size="lg" lts={0.4}>Sector Analysis</Text>
                <Stack mt="lg">
                    <Text fw={700} size="sm">Economic Sector</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="cyan" value={50} />
                    
                    <Text fw={700} size="sm">Social Sector</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="pink" value={20} />

                    <Text fw={700} size="sm">Infrastructure</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="lime" value={90} />

                    <Text fw={700} size="sm">Environmental & Natural Resources</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="green" value={79} />

                    <Text fw={700} size="sm">Institutional</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="teal" value={67} />

                    <Text fw={700} size="sm">Unassigned</Text>
                    <Text fw={700} c="dimmed" lh={0.1} size="xs">Appropriation</Text>
                    <Progress lh={0.1} color="gray" value={2} />
                </Stack>
            </Paper>
        </Group>
    </>
}