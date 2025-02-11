import { ActionIcon, Flex, Group, lighten, Paper, px, rem, Stack, Table, Text, ThemeIcon, Tooltip } from "@mantine/core"
import { TextExtraSmall, TextSemiTitle, TextSubTitle, TextTitle } from "../../components/ui/Text"
import { IconFolder, IconPlus, IconX } from "@tabler/icons-react"
import { FileIcon } from 'react-file-icon'

export const Document = () => {

    return <>
        <Stack gap="xl">
            <Stack mt="xl">
                <TextTitle label="Document" />
                <TextSubTitle label="A list of all the documents registered in the system" />
            </Stack>
            <Flex align="center" gap="xs">
                <Tooltip label="New">
                    <ActionIcon
                        radius="xl"
                        variant="light"
                        color="gray"
                        size="xs"
                    >
                        <ThemeIcon
                            variant="transparent"
                            color="gray"
                            size="xs"
                        >
                            <IconPlus />
                        </ThemeIcon>
                    </ActionIcon>
                </Tooltip>
                <Text fz={px(15)} lh={0.1} fw={500}>Folders</Text>
            </Flex>
            <Group>
                <Paper style={{ cursor: "pointer" }} miw={rem(220)} radius="md" bg={lighten('#dad7cd', 0.7)} p="sm">
                    <Stack gap={0}>
                        <ThemeIcon
                            variant="transparent"
                            size={px(60)}
                        >
                            <IconFolder size={"100%"} stroke={0.5} />
                        </ThemeIcon>
                        <TextSemiTitle label="Results 2023" />
                        <Group>
                            <TextExtraSmall label="23 Files • 1.0 MB" />
                        </Group>
                    </Stack>
                </Paper>
                <Paper style={{ cursor: "pointer" }} miw={rem(220)} radius="md" bg={lighten('#dad7cd', 0.7)} p="sm">
                    <Stack gap={0}>
                        <ThemeIcon
                            variant="transparent"
                            size={px(60)}
                        >
                            <IconFolder size={"100%"} stroke={0.5} />
                        </ThemeIcon>
                        <TextSemiTitle label="Market Analysis" />
                        <Group>
                            <TextExtraSmall label="8 Files • 56 MB" />
                        </Group>
                    </Stack>
                </Paper>
            </Group>
            <Flex align="center" gap="xs">
                <Tooltip label="Clear">
                    <ActionIcon
                        radius="xl"
                        variant="light"
                        color="gray"
                        size="xs"
                    >
                        <ThemeIcon
                            variant="transparent"
                            color="gray"
                            size="xs"
                        >
                            <IconX />
                        </ThemeIcon>
                    </ActionIcon>
                </Tooltip>
                <Text fz={px(15)} lh={0.1} fw={500}>Recent</Text>
            </Flex>
            <Group>
                <Paper style={{ cursor: "pointer" }} miw={rem(250)} withBorder radius="md" p="sm">
                    <Flex gap="sm" align="center">
                        <ThemeIcon
                            variant="transparent"
                            size="lg"
                        >
                            <FileIcon
                                color="#2C5898"
                                labelColor="#2C5898"
                                labelUppercase
                                type="document"
                                glyphColor="rgba(255,255,255,0.4)"
                                extension="doc"
                            />
                        </ThemeIcon>
                        <Stack gap={0}>
                            <Text lh={1.3} size="md" fw={600} c="#14213d">Analysis Data July</Text>
                            <Text lh={1.3} size="xs" c="dimmed">Aug 5, 2023 • 1.0 MB</Text>
                        </Stack>
                    </Flex>
                </Paper>
                <Paper style={{ cursor: "pointer" }} miw={rem(250)} withBorder radius="md" p="sm">
                    <Flex gap="sm" align="center">
                        <ThemeIcon
                            variant="transparent"
                            size="lg"
                        >
                            <FileIcon
                                color="#c1121f"
                                labelColor="#c1121f"
                                labelUppercase
                                type="document"
                                glyphColor="rgba(255,255,255,0.4)"
                                extension="ppt"
                            />
                        </ThemeIcon>
                        <Stack gap={0}>
                            <Text lh={1.3} size="md" fw={600} c="#14213d">Q2 Results</Text>
                            <Text lh={1.3} size="xs" c="dimmed">Jul 31, 2023 • 2.5 MB</Text>
                        </Stack>
                    </Flex>
                </Paper>
            </Group>
            <Text fz={px(15)} lh={0.1} fw={500}>All Files</Text>
            <Table horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Files</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Td>
                            <Flex align="center" gap="xs">
                                <ThemeIcon
                                    variant="transparent"
                                    size="sm"
                                >
                                    <FileIcon
                                        color="#2C5898"
                                        labelColor="#2C5898"
                                        labelUppercase
                                        type="document"
                                        glyphColor="rgba(255,255,255,0.4)"
                                        extension="doc"
                                    />
                                </ThemeIcon>
                                <Text size="sm" fw={300}> 
                                    Sequence Data
                                </Text>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td>
                            <Flex align="center" gap="xs">
                                <ThemeIcon
                                    variant="transparent"
                                    size="sm"
                                >
                                    <FileIcon
                                        color="#2C5898"
                                        labelColor="#2C5898"
                                        labelUppercase
                                        type="document"
                                        glyphColor="rgba(255,255,255,0.4)"
                                        extension="doc"
                                    />
                                </ThemeIcon>
                                <Text size="sm" fw={300}> 
                                    Analysis Data July
                                </Text>
                            </Flex>
                        </Table.Td>
                    </Table.Tr>
                </Table.Tbody>   
            </Table>
        </Stack>
    </>
}