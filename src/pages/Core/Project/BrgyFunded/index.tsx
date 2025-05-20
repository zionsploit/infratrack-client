import { Autocomplete, Badge, Button, Drawer, Flex, Group, NumberFormatter, Paper, Progress, px, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconInfoSquareRounded, IconPlus, IconSearch, IconSettings } from "@tabler/icons-react"
import { Link, NavLink } from "react-router"
import { filterBarangays, filterProjectCategories, filterProjectType, filterSector, filterSourceOfFunds, filterSustainableDevGoal, filterYearsData } from "../../mock/CityFundedProject"
import { TextSubTitle, TextTitle } from "../../../../components/ui/Text"
import useGetAllProjectByFunded from "../../../../fetchHooks/query/project/useGetAllProjectByFunded"
import { useEffect, useState } from "react"
import { ProjectsFunded } from "../../../../ServerTypes/Project"

export default () => {
    const [openFilterDrawer, handlerOpenFilterDrawer] = useDisclosure(false)
    const [projectsData, setProjectsData] = useState<Array<ProjectsFunded>>([])

    const getAllProjects = useGetAllProjectByFunded({project_funded: "brgy-funded", enabled: true})

    useEffect(() => {
        if (getAllProjects.data) {
            setProjectsData(getAllProjects.data)
        }
    }, [getAllProjects.data])

    return <>
        <Stack gap="xl">
            <Stack mt="xl">
                <TextTitle label="Brgy Funded Projects" />
                <TextSubTitle label="A list of all the brgy funded projects entered in the system" />
            </Stack>
            <Paper>
                <Flex my="sm" justify="space-between">
                    <Button component={Link} to={"add"} leftSection={
                        <ThemeIcon
                            variant="transparent" size="sm" color="white"
                        >
                            <IconPlus />
                        </ThemeIcon>
                    } size="sm">Create Project</Button>
                    <Group>
                        <TextInput leftSection={
                            <ThemeIcon variant="transparent" size="sm" color="gray">
                                <IconSearch stroke={1} />
                            </ThemeIcon>
                        } size="sm" w={rem(300)} placeholder="Search Project or Constructors" />
                        <Button onClick={handlerOpenFilterDrawer.open} color="green" variant="light" leftSection={
                            <ThemeIcon
                                variant="transparent" size="sm" color="green"
                            >
                                <IconSettings />
                            </ThemeIcon>
                        } size="sm">Table Setting</Button>
                    </Group>
                </Flex>
                <Table horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Project Name</Table.Th>
                            <Table.Th>Code</Table.Th>
                            <Table.Th>Contract Cost</Table.Th>
                            <Table.Th>Contractor</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projectsData.length > 0 && projectsData.map((project, index) => 
                        <Table.Tr key={index}>
                            <Table.Td>
                                <Flex align="center">
                                    <ThemeIcon
                                        variant="transparent"
                                        color="blue"
                                    >
                                        <IconInfoSquareRounded />
                                    </ThemeIcon>
                                    <Text size="sm" fw={700} c="blue" component={NavLink} to={""}> 
                                        {project.projects.project_name}
                                    </Text>
                                </Flex>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    {project.projects.project_code}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    <NumberFormatter thousandSeparator value={project.project_full_details.project_details.contract_cost} />
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700} c="blue" component={NavLink} to={""}>
                                    {project.project_full_details.contractors.contractor_name}
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge size="sm" variant="light" color="gray">
                                    - {project.project_full_details.project_status.status}
                                </Badge>
                            </Table.Td>
                        </Table.Tr>
                        )}
                        {/* <Table.Tr>
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
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    DF22-8000-B1g
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    <NumberFormatter thousandSeparator value={290327.22} />
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700} c="blue" component={NavLink} to={""}>
                                    BlueRidge Constructors
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Flex justify="space-between">
                                    <Text size="xs" fw="bold" c="green">50%</Text>
                                    <Text size="xs" fw="bold" c="red">20%</Text>
                                </Flex>
                                <Tooltip.Group openDelay={500} closeDelay={500}>
                                    <Tooltip label="Project Completion" position="bottom" color="#bbd0ff" lts={1} fw={600} fz={px(12)} c="black">
                                        <Progress.Root>
                                            <Progress.Section style={{ borderColor: 'gray', margin: 1 }} value={80} color="green" />
                                            <Progress.Section style={{ borderColor: 'gray', margin: 1 }} value={20} color="red" />
                                        </Progress.Root>
                                    </Tooltip>
                                    <Group gap="md" my="xs">
                                        <Tooltip label="Project Status" position="bottom" color="#bbd0ff" lts={1} fw={600} fz={px(12)} c="black">
                                            <Badge size="sm" variant="light" color="pink">
                                                On-Going
                                            </Badge>
                                        </Tooltip>
                                        <Tooltip label="Project Duration" position="bottom" color="#bbd0ff" lts={1} fw={600} fz={px(12)} c="black">
                                            <Badge size="sm" variant="light" color="indigo">
                                                Jan 13 2024 - Mar 18 2026
                                            </Badge>
                                        </Tooltip>
                                    </Group>
                                </Tooltip.Group>
                            </Table.Td>
                        </Table.Tr>
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
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    DF22-8000-B1g
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700}>
                                    <NumberFormatter thousandSeparator value={290327.22} />
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Text size="sm" fw={700} c="blue" component={NavLink} to={""}>
                                    BlueRidge Constructors
                                </Text>
                            </Table.Td>
                            <Table.Td>
                                <Badge size="sm" variant="light" color="gray">
                                    - Not yet started at Engineer's Office
                                </Badge>
                            </Table.Td>
                        </Table.Tr> */}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
        <Drawer position="right" offset={8} radius="md" opened={openFilterDrawer} onClose={handlerOpenFilterDrawer.close} withinPortal title={<Text fz={px(20)} fw={700} c="#353535">Table Settings</Text>}>
            <Stack>
                <Paper withBorder p="md">
                    <Text my="xs" size="sm" lh={0.8} fw={700} c="#1b263b">Filter Results</Text>
                    <Stack>
                        <Autocomplete
                            label="Years"
                            placeholder="Pick a year for filter"
                            data={filterYearsData}
                        />
                        <Autocomplete
                            label="Source of funds"
                            placeholder="Pick a source of funds for filter"
                            data={filterSourceOfFunds}
                        />
                        <Autocomplete
                            label="Sectors"
                            placeholder="Pick a sectors for filter"
                            data={filterSector}
                        />
                        <Autocomplete
                            label="Project Type"
                            placeholder="Pick a project type for filter"
                            data={filterProjectType}
                        />
                        <Autocomplete
                            label="Project Categories"
                            placeholder="Pick a project categories for filter"
                            data={filterProjectCategories}
                        />
                        <Autocomplete
                            label="Barangay"
                            placeholder="Pick a Barangay for filter"
                            data={filterBarangays}
                        />
                        <Autocomplete
                            label="Sustainable Dev't Goal"
                            placeholder="Pick a sustainable Dev't Goal for filter"
                            data={filterSustainableDevGoal}
                        />
                    </Stack>
                </Paper>
            </Stack>
        </Drawer>
    </>
}