import { Flex, Group, NumberFormatter, Paper, Progress, rem, ScrollArea, Stack, Text } from "@mantine/core"

export const Top10Contractors = () => {

    return <>
        <Paper withBorder p="md">
            <Text fw={700} size="lg" lts={0.4}>Top 10 Contractors by Awarded Project</Text>
            <ScrollArea h={rem(500)} offsetScrollbars>
                <Stack my="md">
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#1</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>QuantumBuild Inc.</Text>
                                <Group justify="space-between" align="flex-end">
                                    <Text lh={0.01} size="xs" fw="bold">Total contract cost.</Text>
                                    <Stack>
                                        <Text lh={0.01} size="xs" fw="bold" lts={0.9}>8 Projects</Text>
                                        <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                            <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                        </Text>
                                    </Stack>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                </Stack>
            </ScrollArea>
        </Paper>
    </>
}