import { Button, Flex, Paper, rem, Stack, Table, Text, TextInput, ThemeIcon } from "@mantine/core"
import { TextSubTitle, TextTitle } from "../../components/ui/Text"
import { IconInfoSquareRounded, IconPlus, IconSearch } from "@tabler/icons-react"
import { NavLink } from "react-router"

export const UsersManagement = () => {

    return <>
        <Stack gap="xl">
            <Stack mt="xl">
                <TextTitle label="Users Management" />
                <TextSubTitle label="A list of all the users registered in the system" />
            </Stack>
            <Paper>
                <Flex my="sm" justify="space-between">
                    <Button leftSection={
                        <ThemeIcon
                            variant="transparent" size="sm" color="white"
                        >
                            <IconPlus />
                        </ThemeIcon>
                    } size="sm">Add Users</Button>
                    <TextInput leftSection={
                            <ThemeIcon variant="transparent" size="sm" color="gray">
                                <IconSearch stroke={1} />
                            </ThemeIcon>
                        } size="sm" w={rem(300)} placeholder="Search Users"
                    />
                </Flex>
                <Table horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
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