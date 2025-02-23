import { Checkbox, Divider, Grid, NumberInput, Paper, rem, Select, Stack, Text, TextInput } from "@mantine/core"
import { yearListArray } from "../../../utils/DateUtils"
import dayjs from 'dayjs'
import useGetAllProjectStatus from "../../../fetchHooks/query/projectStatus/useGetAllProjectStatus"
import { useEffect, useState } from "react"
import { ResponseProjectStatus } from "../../../ServerTypes/Project"
import useGetAllBarangays from "../../../fetchHooks/query/projectInterface/useGetAllBarangays"
import { ReturnBarangays, ReturnCategories, ReturnIncharge, ReturnProjectTypes, ReturnSectors, ReturnSourceOfFunds, ReturnSustainableDevelopmentGoals } from "../../../ServerTypes/ProjectInterface"
import useGetAllPt from "../../../fetchHooks/query/projectInterface/useGetAllPt"
import useGetAllCategories from "../../../fetchHooks/query/projectInterface/useGetAllCategories"
import useGetAllSof from "../../../fetchHooks/query/projectInterface/useGetAllSof"
import useGetAllIncharge from "../../../fetchHooks/query/projectInterface/useGetAllIncharge"
import useGetAllSdg from "../../../fetchHooks/query/projectInterface/useGetAllSdg"
import useGetAllSector from "../../../fetchHooks/query/projectInterface/useGetAllSector"

export const AddProject =  () => {
    const [projectSectorData, setprojectSectorData] = useState<Array<ReturnSectors>>([])
    const [projectSdgData, setProjectSdgData] = useState<Array<ReturnSustainableDevelopmentGoals>>([])
    const [projectInchargeData, setProjectInchargeData] = useState<Array<ReturnIncharge>>([])
    const [projectSourceOfFundsData, setProjectSourceOfFundsData] = useState<Array<ReturnSourceOfFunds>>([])
    const [projectCategoryData, setProjectCategoryData] = useState<Array<ReturnCategories>>([])
    const [projectTypeData, setProjectTypesData] = useState<Array<ReturnProjectTypes>>([])
    const [barangaysData, setBarangaysData] = useState<Array<ReturnBarangays>>([])
    const [projectStatusData, setProjectStatusData] = useState<Array<ResponseProjectStatus>>([])

    const getAllProjectStatus = useGetAllProjectStatus()
    const getAllBarangays = useGetAllBarangays()
    const getAllProjectTypes = useGetAllPt()
    const getAllProjectCategory = useGetAllCategories()
    const getAllProjectSourceOfFunds = useGetAllSof()
    const getAllProjectIncharge = useGetAllIncharge()
    const getAllProjectSdg = useGetAllSdg()
    const getAllProjectSector = useGetAllSector()

    useEffect(() => {
        if (getAllProjectStatus.data) {
            setProjectStatusData(getAllProjectStatus.data)
        }
    }, [getAllProjectStatus.data])

    useEffect(() => {
        if (getAllBarangays.data) {
            setBarangaysData(getAllBarangays.data)
        }
    }, [getAllBarangays.data])

    useEffect(() => {
        if (getAllProjectTypes.data) {
            setProjectTypesData(getAllProjectTypes.data)
        }
    }, [getAllProjectTypes.data])

    useEffect(() => {
        if (getAllProjectCategory.data) {
            setProjectCategoryData(getAllProjectCategory.data)
        }
    }, [getAllProjectCategory.data])

    useEffect(() => {
        if (getAllProjectSourceOfFunds.data) {
            setProjectSourceOfFundsData(getAllProjectSourceOfFunds.data)
        }
    }, [getAllProjectSourceOfFunds.data])

    useEffect(() => {
        if (getAllProjectIncharge.data) {
            setProjectInchargeData(getAllProjectIncharge.data)
        }
    }, [getAllProjectIncharge.data])

    useEffect(() => {
        if (getAllProjectSdg.data) {
            setProjectSdgData(getAllProjectSdg.data)
        }
    }, [getAllProjectSdg.data])

    useEffect(() => {
        if (getAllProjectSector.data) {
            setprojectSectorData(getAllProjectSector.data)
        }
    }, [getAllProjectSector.data])

    return <>
       <Stack gap="xl">
            <Text mt="xl" fz="h1" fw="bolder">Add Project</Text>
            <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                <Stack my="sm">
                    <Text fz="h3" fw={500} lh={0.1}>Project Details</Text>
                    <Text size="sm">General information of the project.</Text>
                </Stack>
                <Stack>
                    <Select
                        w={rem("500px")}
                        label="Project Year:"
                        placeholder="Select Project Year"
                        data={yearListArray(2010, dayjs().year() + 5).reverse()}
                        clearable
                    />
                    <Divider />
                    <TextInput
                        w={rem("500px")}
                        label="Project Name:"
                    />
                    <Divider />
                    <TextInput
                        w={rem("500px")}
                        label="Project Code:"
                    />
                    <Divider />
                    <Select
                        w={rem("500px")}
                        label="Project Status:"
                        placeholder="Select Project Status"
                        data={projectStatusData.map((projectStatus) => {
                            return {
                                label: projectStatus.status,
                                value: String(projectStatus.id)
                            }
                        })}
                        clearable
                    />
                    <Divider />
                    <Text>Barangays:</Text>
                    <Paper withBorder p="sm" shadow="xs">
                        <Checkbox.Group>
                            <Grid>
                                {barangaysData.map((barangay, index) => <Grid.Col span={2} key={index}>
                                    <Checkbox 
                                        value={barangay.id} 
                                        label={barangay.barangays}
                                    />
                                </Grid.Col>)}
                            </Grid>
                        </Checkbox.Group>
                    </Paper>
                    <Divider />
                    <NumberInput
                        w={rem("500px")}
                        hideControls
                        label="Appropriation"
                        thousandSeparator
                    />
                    <Divider />
                    <NumberInput
                        w={rem("500px")}
                        hideControls
                        label="Approved Budget Contract (ABC)"
                        thousandSeparator
                    />
                </Stack>
            </Paper>
            <Divider />
            <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                <Stack my="sm">
                    <Text fz="h3" fw={500} lh={0.1}>Checklists</Text>
                    <Text size="sm">Check the data according to where to project belongs.</Text>
                </Stack>
                <Stack>
                    <Select
                        w={rem("500px")}
                        label="Project Types:"
                        placeholder="Select Project Type"
                        data={projectTypeData.map((projectType) => {
                            return {
                                label: projectType.pt_title,
                                value: String(projectType.id)
                            }
                        })}
                        clearable
                    />
                    <Divider />
                    <Select
                        w={rem("500px")}
                        label="Project Category:"
                        placeholder="Select Category"
                        data={projectCategoryData.map((projectCategory) => {
                            return {
                                label: projectCategory.categories,
                                value: String(projectCategory.id)
                            }
                        })}
                        clearable
                    />
                    <Divider />
                    <Select
                        w={rem("500px")}
                        label="Project Source Of Funds:"
                        placeholder="Select Source Of Funds"
                        data={projectSourceOfFundsData.map((projectSourceOfFunds) => {
                            return {
                                label: projectSourceOfFunds.sof_title,
                                value: String(projectSourceOfFunds.id)
                            }
                        })}
                        clearable
                    />
                    <Divider />
                    <Select
                        w={rem("500px")}
                        label="Project Mode of implementation:"
                        placeholder="Select Mode of implementation"
                        data={projectInchargeData.map((incharge) => {
                            return {
                                label: incharge.incharge,
                                value: String(incharge.id)
                            }
                        })}
                        clearable
                    />
                    <Divider />
                    <Text>Sustainable Development Goals:</Text>
                    <Paper withBorder p="sm" shadow="xs">
                        <Checkbox.Group>
                            <Grid>
                                {projectSdgData.map((projectsdg, index) => <Grid.Col span={2} key={index}>
                                    <Checkbox 
                                        value={projectsdg.id} 
                                        label={projectsdg.sdg_title}
                                    />
                                </Grid.Col>)}
                            </Grid>
                        </Checkbox.Group>
                    </Paper>
                    <Divider />
                    <Text>Sector:</Text>
                    <Paper withBorder p="sm" shadow="xs">
                        <Checkbox.Group>
                            <Grid>
                                {projectSectorData.map((projectSector, index) => <Grid.Col span={2} key={index}>
                                    <Checkbox 
                                        value={projectSector.id} 
                                        label={projectSector.sectors}
                                    />
                                </Grid.Col>)}
                            </Grid>
                        </Checkbox.Group>
                    </Paper>
                    <Divider />
                </Stack>
            </Paper>
       </Stack>
    </>
}