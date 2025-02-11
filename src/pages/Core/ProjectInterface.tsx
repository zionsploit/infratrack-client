import { ActionIcon, Avatar, Divider, Flex, Group, Stack, Table, Text, ThemeIcon, Tooltip } from "@mantine/core"
import { TextSubTitle, TextTitle } from "../../components/ui/Text"
import { IconPlus } from "@tabler/icons-react"
import SustainableDevelopmentGoals from "./ProjectInterface/SustainableDevelopmentGoals"
import SourceOfFunds from "./ProjectInterface/SourceOfFunds"
import ProjectTypes from "./ProjectInterface/ProjectTypes"
import ModeOfImplementation from "./ProjectInterface/ModeOfImplementation"
import Categories from "./ProjectInterface/Categories"
import Sectors from "./ProjectInterface/Sectors"
import Barangays from "./ProjectInterface/Barangays"
import UnitOfMeasurement from "./ProjectInterface/UnitOfMeasurement"
import ProjectScope from "./ProjectInterface/ProjectScope"

export const ProjectInterface = () => {

    return <>
        <Stack gap="xl">
           <Stack mt="xl">
                <TextTitle label="Project Interface" />
                <TextSubTitle label="A components of all project interface in the system" />
            </Stack>
            <Stack>
                <Group align="self-start">
                    <SustainableDevelopmentGoals />
                    <SourceOfFunds />
                    <ProjectTypes />
                </Group>
                <Group align="self-start">
                    <ModeOfImplementation />
                    <Categories />
                    <Sectors />
                </Group>
                <Group align="self-start">
                    <Barangays />
                    <UnitOfMeasurement />
                    <ProjectScope />
                </Group>
            </Stack>
            <Divider />
            <Group>
                <Flex align="center" gap="sm">
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
                    <Text size="md" fw="bold" c="#14213d">Project Takers</Text>
                </Flex>
                <Table horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Professional</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>
                                <Flex align="center" gap="md">
                                    <Avatar radius="xl" variant="light" color="blue" alt="takers 1">AC</Avatar>
                                    <Text size="md" fw={600} c="#14213d">Alex Carter</Text>
                                </Flex>
                            </Table.Td>
                            <Table.Td>Chairman of the Board</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
            </Group>
        </Stack>
    </>
}