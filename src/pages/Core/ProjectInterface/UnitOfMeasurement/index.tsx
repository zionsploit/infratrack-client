import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { ReturnUnitOfMeasurements, UnitOfMeasurements as UMTypes } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddUM from "../../../../fetchHooks/mutation/projectInterface/useAddUM"
import useGetAllUM from "../../../../fetchHooks/query/projectInterface/useGetAllUM"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const umSchema = yup.object({
    um_title: yup.string().required("UM name is required")
})

export default () => {
    const [umData, setUmData] = useState<Array<ReturnUnitOfMeasurements>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<UMTypes>({
        defaultValues: {
            um_title: ''
        },
        resolver: yupResolver(umSchema)
    })

    // QUERY
    const getAllUM = useGetAllUM()
    // MUTATION
    const mutationAddUM = useAddUM()

    useEffect(() => {
        if (getAllUM.data) {
            setUmData(getAllUM.data)
        }
    }, [getAllUM.data])

    const OnSubmitData = async (data: UMTypes) => {
        await mutationAddUM.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Unit of Measurements</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create UM">
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
                                    name="um_title"
                                    render={({field}) => <TextInput
                                        label="Name"
                                        placeholder="Input new Unit of Measurement"
                                        size="xs"
                                        error={errors.um_title?.message}
                                        {...field} 
                                    />}
                                />
                                <Button leftSection={mutationAddUM.isPending ? <Loader size="xs" /> : null} disabled={mutationAddUM.isPending} type="submit" fullWidth size="xs">Add</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
            <Table.ScrollContainer minWidth={rem("auto")} h={rem("500px")}>
                <Table stickyHeader horizontalSpacing="md" withTableBorder striped verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Unit Name</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {umData.length > 0 ? umData.map((um) =>
                            <TableData key={um.id} um={um} />
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