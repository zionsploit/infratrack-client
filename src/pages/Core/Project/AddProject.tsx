import { Button, Checkbox, Divider, Flex, Grid, NumberInput, Paper, rem, Select, Stack, Text, Textarea, TextInput } from "@mantine/core"
import { yearListArray } from "../../../utils/DateUtils"
import dayjs from 'dayjs'
import useGetAllProjectStatus from "../../../fetchHooks/query/projectStatus/useGetAllProjectStatus"
import { useEffect, useState } from "react"
import { Project, ResponseProjectStatus } from "../../../ServerTypes/Project"
import useGetAllBarangays from "../../../fetchHooks/query/projectInterface/useGetAllBarangays"
import { ReturnBarangays, ReturnCategories, ReturnIncharge, ReturnProjectTypes, ReturnSectors, ReturnSourceOfFunds, ReturnSustainableDevelopmentGoals } from "../../../ServerTypes/ProjectInterface"
import useGetAllPt from "../../../fetchHooks/query/projectInterface/useGetAllPt"
import useGetAllCategories from "../../../fetchHooks/query/projectInterface/useGetAllCategories"
import useGetAllSof from "../../../fetchHooks/query/projectInterface/useGetAllSof"
import useGetAllIncharge from "../../../fetchHooks/query/projectInterface/useGetAllIncharge"
import useGetAllSdg from "../../../fetchHooks/query/projectInterface/useGetAllSdg"
import useGetAllSector from "../../../fetchHooks/query/projectInterface/useGetAllSector"
import { ReturnProjectTakers } from "../../../ServerTypes/ProjectTakers"
import useGetAllProjectTakers from "../../../fetchHooks/query/projectTakers/useGetAllProjectTakers"
import { IconPercentage } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import { getURL } from "../../../utils/UrlUtils"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"


// DEFINED CONSTANT VALUE
const projectFunded = getURL().split('/')[2]

const projectSchema = yup.object({
    project_name: yup.string().required("Project name is required."),
    project_year: yup.string().required("Project year is required."),
    project_funded: yup.string().required("Project Code is required."),
    project_code: yup.string().required("Project Code is required."),
    project_status_id: yup.string().required("Project Status is required."),
    project_barangay_id: yup.string().required("Project Barangay is required."),
    appropriation: yup.number().default(0).required("Project appropriation should have default 0 value"),
    approved_budget_contract: yup.number().required("Project ABC required."),
    contract_detail_id: yup.number().required("Project contractd details required."),
    project_type_id: yup.string().required("Project type required"),
    project_category_id: yup.string().required("Project category required"),
    project_source_of_fund_id: yup.string().required("Project source of funds required"),
    project_mode_of_implementation_id: yup.string().required("Project mode of implementation required"),
    project_sustainable_developement_id: yup.string().required("Project sustainable development goals required"),
    project_sector_id: yup.string().required("Project sector is required"),
    project_taker_id: yup.string().required("Project taker is required"),
    accomplished: yup.number().default(0).required("Project accomplished is required"),
    remarks: yup.string().default(""),
    prepared_by: yup.string().default("")
})

type ParseProject = Omit<Project, 
    'project_year' | 
    'project_status_id' |
    'project_barangay_id' | 
    'project_type_id' | 
    'project_category_id' | 
    'project_source_of_fund_id' | 
    'project_mode_of_implementation_id' | 
    'project_sustainable_developement_id' | 
    'project_sector_id' | 
    'project_taker_id'
    > & { 
        project_year: string,
        project_status_id: string,
        project_barangay_id: string,
        project_type_id: string,
        project_category_id: string,
        project_source_of_fund_id: string,
        project_mode_of_implementation_id: string,
        project_sustainable_developement_id: string,
        project_sector_id: string,
        project_taker_id: string
    }

export const AddProject =  () => {
    const [projectTakersData, setProjectTakersData] = useState<Array<ReturnProjectTakers>>([])
    const [projectSectorData, setProjectSectorData] = useState<Array<ReturnSectors>>([])
    const [projectSdgData, setProjectSdgData] = useState<Array<ReturnSustainableDevelopmentGoals>>([])
    const [projectInchargeData, setProjectInchargeData] = useState<Array<ReturnIncharge>>([])
    const [projectSourceOfFundsData, setProjectSourceOfFundsData] = useState<Array<ReturnSourceOfFunds>>([])
    const [projectCategoryData, setProjectCategoryData] = useState<Array<ReturnCategories>>([])
    const [projectTypeData, setProjectTypesData] = useState<Array<ReturnProjectTypes>>([])
    const [barangaysData, setBarangaysData] = useState<Array<ReturnBarangays>>([])
    const [projectStatusData, setProjectStatusData] = useState<Array<ResponseProjectStatus>>([])

    const { handleSubmit, control, formState: { errors, defaultValues } } = useForm<ParseProject>({
        defaultValues: {
            project_name: "",
            project_year: "",
            project_funded: projectFunded,
            project_code: '',
            project_status_id: "",
            project_barangay_id: "",
            appropriation: 0,
            approved_budget_contract: 0,
            contract_detail_id: 0,
            project_type_id: "",
            project_category_id: "",
            project_source_of_fund_id: "",
            project_mode_of_implementation_id: "",
            project_sustainable_developement_id: "",
            project_sector_id: "",
            project_taker_id: "",
            accomplished: 0,
            remarks: "",
            // TO DO: Replace to current users
            // wip: remove static value for prepared_by into current users name
            prepared_by: 'John Banisilon'
        },
        resolver: yupResolver(projectSchema)
    })


    const getAllProjectStatus = useGetAllProjectStatus()
    const getAllBarangays = useGetAllBarangays()
    const getAllProjectTypes = useGetAllPt()
    const getAllProjectCategory = useGetAllCategories()
    const getAllProjectSourceOfFunds = useGetAllSof()
    const getAllProjectIncharge = useGetAllIncharge()
    const getAllProjectSdg = useGetAllSdg()
    const getAllProjectSector = useGetAllSector()
    const getAllProjectTakers = useGetAllProjectTakers()

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
            setProjectSectorData(getAllProjectSector.data)
        }
    }, [getAllProjectSector.data])

    useEffect(() => {
        if (getAllProjectTakers.data) {
            setProjectTakersData(getAllProjectTakers.data)
        }
    }, [getAllProjectTakers.data])

    const OnClickSubmitData = async (data: ParseProject) => {
        console.log(data)
        console.log("SOMETHING")
    }

    return <>
       <Stack gap="xl">
            <Text mt="xl" fz="h1" fw="bolder">Add Project</Text>
            <form onSubmit={handleSubmit(OnClickSubmitData)}>
                <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                    <Stack my="sm">
                        <Text fz="h3" fw={500} lh={0.1}>Project Details</Text>
                        <Text size="sm">General information of the project.</Text>
                    </Stack>
                    <Stack>
                        <Controller 
                            control={control}
                            name="project_year"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Year:"
                                placeholder="Select Project Year"
                                data={yearListArray(2010, dayjs().year() + 5).reverse()}
                                clearable
                                error={errors.project_year?.message}
                                {...field}
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_name"
                            render={({ field }) => <TextInput
                                w={rem("500px")}
                                label="Project Name:"
                                error={errors.project_name?.message}
                                {...field}
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_code"
                            render={({ field }) => <TextInput
                                w={rem("500px")}
                                label="Project Code:"
                                error={errors.project_code?.message}
                                {...field}
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_status_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Status:"
                                placeholder="Select Project Status"
                                data={projectStatusData.map((projectStatus) => {
                                    return {
                                        label: projectStatus.status,
                                        value: projectStatus.id.toString()
                                    }
                                })}
                                error={errors.project_status_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_barangay_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Barangays:"
                                placeholder="Select Project Barangays"
                                data={barangaysData.map((barangay) => {
                                    return {
                                        label: barangay.barangays,
                                        value: barangay.id.toString()
                                    }
                                })}
                                error={errors.project_barangay_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="appropriation"
                            render={({ field }) => <NumberInput
                                w={rem("500px")}
                                hideControls
                                label="Appropriation"
                                thousandSeparator
                                error={errors.appropriation?.message}
                                {...field}
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="approved_budget_contract"
                            render={({ field }) => <NumberInput
                                w={rem("500px")}
                                hideControls
                                label="Approved Budget Contract (ABC)"
                                thousandSeparator
                                error={errors.approved_budget_contract?.message}
                                {...field}
                            />}
                        />
                    </Stack>
                </Paper>
                <Divider my="xl" />
                <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                    <Stack my="sm">
                        <Text fz="h3" fw={500} lh={0.1}>Checklists</Text>
                        <Text size="sm">Check the data according to where to project belongs.</Text>
                    </Stack>
                    <Stack>
                        <Controller
                            control={control}
                            name="project_type_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Types:"
                                placeholder="Select Project Type"
                                data={projectTypeData.map((projectType) => {
                                    return {
                                        label: projectType.pt_title,
                                        value: String(projectType.id)
                                    }
                                })}
                                error={errors.project_type_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_category_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Category:"
                                placeholder="Select Category"
                                data={projectCategoryData.map((projectCategory) => {
                                    return {
                                        label: projectCategory.categories,
                                        value: String(projectCategory.id)
                                    }
                                })}
                                error={errors.project_category_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_source_of_fund_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Source Of Funds:"
                                placeholder="Select Source Of Funds"
                                data={projectSourceOfFundsData.map((projectSourceOfFunds) => {
                                    return {
                                        label: projectSourceOfFunds.sof_title,
                                        value: String(projectSourceOfFunds.id)
                                    }
                                })}
                                error={errors.project_source_of_fund_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_mode_of_implementation_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Mode of implementation:"
                                placeholder="Select Mode of implementation"
                                data={projectInchargeData.map((incharge) => {
                                    return {
                                        label: incharge.incharge,
                                        value: String(incharge.id)
                                    }
                                })}
                                error={errors.project_mode_of_implementation_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_sustainable_developement_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Sustainable Development Goals:"
                                placeholder="Select Sustainable Development Goals"
                                data={projectSdgData.map((projectsdg) => {
                                    return {
                                        label: projectsdg.sdg_title,
                                        value: String(projectsdg.id)
                                    }
                                })}
                                error={errors.project_sustainable_developement_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_sector_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Sector:"
                                placeholder="Select Select Sector"
                                data={projectSectorData.map((projectSector) => {
                                    return {
                                        label: projectSector.sectors,
                                        value: String(projectSector.id)
                                    }
                                })}
                                error={errors.project_sector_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="project_taker_id"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Project Takers:"
                                placeholder="Select Project Takers"
                                data={projectTakersData.map((projectTakers) => {
                                    return {
                                        label: projectTakers.last_name,
                                        value: String(projectTakers.id)
                                    }
                                })}
                                error={errors.project_taker_id?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="accomplished"
                            render={({ field }) => <NumberInput
                                w={rem("500px")}
                                hideControls
                                label="Accomplished"
                                allowDecimal
                                rightSection={<IconPercentage />}
                                error={errors.accomplished?.message}
                                {...field}
                            />}
                        />
                        <Divider />
                        <Controller
                            control={control}
                            name="remarks"
                            render={({ field }) => <Textarea
                                w={rem("100%")}
                                label="Remarks"
                                description="(Optional)"
                                autosize
                                error={errors.remarks?.message}
                                {...field}
                            />}
                        />
                    </Stack>
                </Paper>
                <Divider my="xl" />
                <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                    <Flex justify="space-between" align="center">
                        <Text fz="lg" fw="bold">Prepared By: {defaultValues?.prepared_by}</Text>
                        <Button type="submit" color="green">Initialized Project</Button>
                    </Flex>
                </Paper>
            </form>
       </Stack>
    </>
}