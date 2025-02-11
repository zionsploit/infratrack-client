import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { ProjectScope as PSType, ReturnProjectScope } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddProjectScope from "../../../../fetchHooks/mutation/projectInterface/useAddProjectScope"
import useGetAllProjectScope from "../../../../fetchHooks/query/projectInterface/useGetAllProjectScope"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const psSchema = yup.object({
    ps_title: yup.string().required("Project Scope name is required")
})

export default () => {
    const [projectScopeData, setProjectScopeData] = useState<Array<ReturnProjectScope>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<PSType>({
        defaultValues: {
            ps_title: ''
        },
        resolver: yupResolver(psSchema)
    })

    // QUERY
    const getAllProjectScope = useGetAllProjectScope()
    // MUTATION
    const mutationAddProjectScope = useAddProjectScope()

    useEffect(() => {
        if (getAllProjectScope.data) {
            setProjectScopeData(getAllProjectScope.data)
        }
    }, [getAllProjectScope.data])

    const OnSubmitData = async (data: PSType) => {
        await mutationAddProjectScope.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Project Scope</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create Project Scope">
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
                                    name="ps_title"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new Project Scope"
                                        size="xs"
                                        error={errors.ps_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddProjectScope.isPending ? <Loader size="xs" /> : null} disabled={mutationAddProjectScope.isPending} type="submit" fullWidth size="xs">Add</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Table.ScrollContainer minWidth={rem("auto")} h={rem("500px")}>
                <Table stickyHeader horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {projectScopeData.length > 0 ? projectScopeData.map((projectScope) =>
                            <TableData key={projectScope.id} ps={projectScope} />
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