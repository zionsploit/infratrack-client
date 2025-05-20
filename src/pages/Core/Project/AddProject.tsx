import { Button, Divider, Flex, NumberInput, Paper, rem, Select, Stack, Text, Textarea, TextInput } from "@mantine/core"
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
import { ReturnProjectTakers } from "../../../ServerTypes/ProjectTakers"
import useGetAllProjectTakers from "../../../fetchHooks/query/projectTakers/useGetAllProjectTakers"
import { IconPercentage } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useAddProject from "../../../fetchHooks/mutation/project/useAddProject"
import { ReturnContractors } from "../../../ServerTypes/Contractors"
import useGetAllContractor from "../../../fetchHooks/query/contractor/useGetAllContractor"
import { ParseProject, getProjectFundedUrl, projectSchema } from "./_projects.api"
import { DateInput } from '@mantine/dates';

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
    const [contractorsData, setContractorsData] = useState<Array<ReturnContractors>>([])

    const { handleSubmit, control, formState: { errors, defaultValues }, watch } = useForm<ParseProject>({
        defaultValues: {
            project_name: "",
            project_year: dayjs(new Date()).year().toString(),
            project_funded: getProjectFundedUrl,
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
            contractor: "",
            contract_cost: 0,
            start_date: new Date(),
            end_date: new Date(),
            day_extension: 0,
            // TO DO: Replace to current users
            // wip: remove static value for prepared_by into current users name
            prepared_by: 'John Banisilon'
        },
        resolver: yupResolver(projectSchema)
    })
    

    // MUTATION
    const addProject = useAddProject()

    // QUERY
    const getAllProjectStatus = useGetAllProjectStatus()
    const getAllBarangays = useGetAllBarangays()
    const getAllProjectTypes = useGetAllPt()
    const getAllProjectCategory = useGetAllCategories()
    const getAllProjectSourceOfFunds = useGetAllSof()
    const getAllProjectIncharge = useGetAllIncharge()
    const getAllProjectSdg = useGetAllSdg()
    const getAllProjectSector = useGetAllSector()
    const getAllProjectTakers = useGetAllProjectTakers()
    const getAllContractors = useGetAllContractor()

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

    useEffect(() => {
        if (getAllContractors.data) {
            setContractorsData(getAllContractors.data)
        }
    }, [getAllContractors.data])

    const OnClickSubmitData = async (data: ParseProject) => {
        await addProject.mutateAsync(data)
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
                    <Stack my="sm">
                        <Text fz="h3" fw={500} lh={0.1}>Contract Details</Text>
                        <Text size="sm">It's inclusive dates and amounts relative to the contract.</Text>
                    </Stack>
                    <Stack>
                        <Controller
                            control={control}
                            name="contractor"
                            render={({ field }) => <Select
                                w={rem("500px")}
                                label="Contractor:"
                                placeholder="Select Contractor"
                                data={contractorsData.map((contractor) => {
                                    return {
                                        label: contractor.contractor_name,
                                        value: contractor.id.toString()
                                    }
                                })}
                                error={errors.contractor?.message}
                                {...field}
                                clearable
                            />}
                        />
                        <Controller
                            control={control}
                            name="contract_cost"
                            render={({ field }) => <NumberInput
                                w={rem("500px")}
                                hideControls
                                label="Contractor Cost:"
                                thousandSeparator
                                error={errors.contract_cost?.message}
                                {...field}
                            />}
                        />
                        <Controller
                            control={control}
                            name="start_date"
                            render={({ field }) => <DateInput
                                {...field}
                                w={rem("500px")}
                                label="Start Date"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.start_date?.message}
                            />}
                        />
                        <Controller
                            control={control}
                            name="end_date"
                            render={({ field }) => <DateInput
                                {...field}
                                w={rem("500px")}
                                label="Target Date"
                                value={field.value}
                                onChange={field.onChange}
                                error={errors.end_date?.message}
                            />}
                        />
                        <Controller
                            control={control}
                            name="day_extension"
                            render={({ field }) => <NumberInput
                                w={rem("500px")}
                                hideControls
                                label="Day Extension:"
                                description="(Optional)"
                                error={errors.contract_cost?.message}
                                {...field}
                            />}
                        />
                        <Text c="dimmed">Calenday Days: {Math.abs(dayjs(watch("start_date")).diff(watch("end_date"), 'day')) + watch("day_extension")}</Text>
                    </Stack>
                </Paper>
                <Divider my="xl" />
                <Paper withBorder p="md" shadow="lg" w={rem("100%")}>
                    <Flex justify="space-between" align="center">
                        <Text fz="lg" fw="bold">Prepared By: {defaultValues?.prepared_by}</Text>
                        <Button loading={addProject.isPending} type="submit" color="green">Initialized Project</Button>
                    </Flex>
                </Paper>
            </form>
       </Stack>
    </>
}