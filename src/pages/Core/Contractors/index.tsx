import { Button, Flex, Paper, rem, Stack, Table, Text, TextInput, ThemeIcon } from "@mantine/core"
import { IconInfoSquareRounded, IconPlus, IconSearch } from "@tabler/icons-react"
import { Link, NavLink } from "react-router"
import { TextSubTitle, TextTitle } from "../../../components/ui/Text"

export const Contractors = () => {

    return <>
        <Stack gap="xl">
            <Stack mt="xl">
                <TextTitle label="Contractors" />
                <TextSubTitle label="A list of all the constractors registered in the system" />
            </Stack>
            <Paper>
                <Flex my="sm" justify="space-between">
                    <Button component={Link} to={"add"} leftSection={
                        <ThemeIcon
                            variant="transparent" size="sm" color="white"
                        >
                            <IconPlus />
                        </ThemeIcon>
                    } size="sm">Add Contractor</Button>
                    <TextInput leftSection={
                            <ThemeIcon variant="transparent" size="sm" color="gray">
                                <IconSearch stroke={1} />
                            </ThemeIcon>
                        } size="sm" w={rem(300)} placeholder="Search Constructors"
                    />
                </Flex>
                <Table horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Constructor Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Flex align="center">
                                    <ThemeIcon
                                        variant="transparent"
                                        color="blue"
                                    >
                                        <IconInfoSquareRounded />
                                    </ThemeIcon>
                                    <Text size="sm" fw={700} c="blue" component={NavLink} to={""}> 
                                        Quantum Leap Computing Unit
                                    </Text>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    </>
}