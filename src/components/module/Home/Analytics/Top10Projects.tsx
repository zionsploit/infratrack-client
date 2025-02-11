import { Flex, Group, NumberFormatter, Paper, Progress, rem, ScrollArea, Stack, Text } from "@mantine/core"

export const Top10Projects = () => {

    return <>
        <Paper withBorder p="md">
            <Text fw={700} size="lg" lts={0.4}>Top 10 Projects by Appropriation</Text>
            <ScrollArea h={rem(500)} offsetScrollbars>
                <Stack my="md">
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#1</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#2</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>CleanGen Hydrogen Fuel Cell 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[DF23-3000-A1]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#3</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>NanoCoat Anti-Scratch Coating 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[GAD23-3000-D2a]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#3</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#5</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#6</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#7</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#8</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#9</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
                                </Group>
                                <Progress value={90} color="gray" />
                            </Stack>
                        </Flex>
                    </Paper>
                    <Paper withBorder p="md">
                        <Flex justify="flex-start" align="center" gap="lg">
                            <Text size="xl" c="dimmed">#10</Text>
                            <Stack w={"100%"}>
                                <Text component="h1" size="sm" fw="bold" lh={0.01}>HyperVent Climate Control System 
                                    <Text component="span" mx="sm" c="dimmed" fw={700}>[2SAIP23-3000--B3]</Text>
                                </Text>
                                <Group justify="space-between">
                                    <Text lh={0.01} size="xs" fw="bold">Appropriation</Text>
                                    <Text lh={0.01} size="xs" fw="bold" lts={0.9}>
                                        <NumberFormatter thousandSeparator decimalScale={2} value={27000000.00} />
                                    </Text>
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