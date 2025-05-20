import { Autocomplete, Badge, Button, Drawer, Flex, Group, NumberFormatter, Paper, Progress, px, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconInfoSquareRounded, IconPlus, IconSearch, IconSettings } from "@tabler/icons-react"
import { Link, NavLink } from "react-router"
import { filterBarangays, filterProjectCategories, filterProjectType, filterSector, filterSourceOfFunds, filterSustainableDevGoal, filterYearsData } from "../../mock/CityFundedProject"
import { TextSubTitle, TextTitle } from "../../../../components/ui/Text"
import { useEffect, useState } from "react"
import { ProjectsFunded } from "../../../../ServerTypes/Project"
import useGetAllProjectByFunded from "../../../../fetchHooks/query/project/useGetAllProjectByFunded"

export default () => {
    const [openFilterDrawer, handlerOpenFilterDrawer] = useDisclosure(false)
    const [projectsData, setProjectsData] = useState<Array<ProjectsFunded>>([])

    const getAllProjects = useGetAllProjectByFunded({project_funded: "city-funded", enabled: true})

    useEffect(() => {
        if (getAllProjects.data) {
            setProjectsData(getAllProjects.data)
        }
    }, [getAllProjects.data])
    return <>
        <Stack gap="xl">
            <Stack mt="xl">
                <TextTitle label="City Funded Projects" />
                <TextSubTitle label="A list of all the city funded projects entered in the system" />
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