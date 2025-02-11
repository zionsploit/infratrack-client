import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import type { ProjectTypes as PTTypes, ReturnProjectTypes } from "../../../../ServerTypes/ProjectInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import useAddProjectTypes from "../../../../fetchHooks/mutation/projectInterface/useAddProjectTypes"
import useGetAllPt from "../../../../fetchHooks/query/projectInterface/useGetAllPt"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const ptSchema = yup.object({
    pt_title: yup.string().required("Project Types name is required")
})

export default () => {
    const [ptData, setPtData] = useState<Array<ReturnProjectTypes>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<PTTypes>({
        defaultValues: {
            pt_title: ''
        },
        resolver: yupResolver(ptSchema)
    })

    // QUERY
    const getAllPt = useGetAllPt()
    // MUTATION
    const mutationAddProjectTypes = useAddProjectTypes()

    useEffect(() => {
        if (getAllPt.data) {
            setPtData(getAllPt.data)
        }
    }, [getAllPt.data])

    const OnSubmitData = async (data: PTTypes) => {
        await mutationAddProjectTypes.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Project Types</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create Project Types">
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
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={handleSubmit(OnSubmitData)}>
                            <Stack gap="xs">
                                <Controller 
                                    control={control}
                                    name="pt_title"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new Project Type"
                                        size="xs"
                                        error={errors.pt_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddProjectTypes.isPending ? <Loader size="xs" /> : null} disabled={mutationAddProjectTypes.isPending} type="submit" fullWidth size="xs">Add</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Table.ScrollContainer minWidth={rem("auto")} h={rem('500px')}>
                <Table stickyHeader horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {ptData.length > 0 ? ptData.map((pt) =>
                            <TableData key={pt.id} pt={pt} />
                        ) : <>
                        <Table.Tr>
                            <Table.Td>
                                No Data Found
                            </Table.Td>
                        </Table.Tr>
                        </>}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Paper>
    </>
}