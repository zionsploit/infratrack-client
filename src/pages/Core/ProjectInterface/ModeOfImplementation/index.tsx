import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { Incharge, ReturnIncharge } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddIncharge from "../../../../fetchHooks/mutation/projectInterface/useAddIncharge"
import useGetAllIncharge from "../../../../fetchHooks/query/projectInterface/useGetAllIncharge"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const inchargeSchema = yup.object({
    incharge: yup.string().required("Incharge name is required")
})

export default () => {
    const [inchargeData, setInchargeData] = useState<Array<ReturnIncharge>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<Incharge>({
        defaultValues: {
            incharge: ''
        },
        resolver: yupResolver(inchargeSchema)
    }) 
    
    // QUERY
    const getAllIncharge = useGetAllIncharge()
    // MUTATION
    const mutationAddIncharge = useAddIncharge()
    
    useEffect(() => {
        if (getAllIncharge.data) {
            setInchargeData(getAllIncharge.data)
        }
    }, [getAllIncharge.data])

    const OnSubmitData = async (data: Incharge) => {
        await mutationAddIncharge.mutateAsync(data)
    }


    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Mode of Implementations</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create Incharge">
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
                                    name="incharge"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new Incharge"
                                        size="xs"
                                        error={errors.incharge?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddIncharge.isPending ? <Loader size="xs" /> : null} disabled={mutationAddIncharge.isPending} type="submit" fullWidth size="xs">Add</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Table.ScrollContainer minWidth={rem("auto")} h={rem('500px')}>
                <Table stickyHeader horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>In-charge</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {inchargeData.length > 0 ? inchargeData.map((incharge) =>
                            <TableData key={incharge.id} incharge={incharge} />
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