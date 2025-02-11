import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { Barangays as BTypes, ReturnBarangays } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddBarangays from "../../../../fetchHooks/mutation/projectInterface/useAddBarangays"
import useGetAllBarangays from "../../../../fetchHooks/query/projectInterface/useGetAllBarangays"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const barangaysSchema = yup.object({
    barangays: yup.string().required("Barangay name is required")
})

export default () => {
    const [barangaysData, setBarangaysData] = useState<Array<ReturnBarangays>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<BTypes>({
        defaultValues: {
            barangays: ''
        },
        resolver: yupResolver(barangaysSchema)
    })

    // QUERY
    const getAllBarangays = useGetAllBarangays()
    // MUTATION
    const mutationAddBarangay = useAddBarangays()

    useEffect(() => {
        if (getAllBarangays.data) {
            setBarangaysData(getAllBarangays.data)
        }
    }, [getAllBarangays.data])

    const OnSubmitData = async (data: BTypes) => {
        await mutationAddBarangay.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Barangays</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
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
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={handleSubmit(OnSubmitData)}>
                            <Stack gap="xs">
                                <Controller 
                                    control={control}
                                    name="barangays"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new barangay"
                                        size="xs"
                                        error={errors.barangays?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddBarangay.isPending ? <Loader size="xs" /> : null} disabled={mutationAddBarangay.isPending} type="submit" fullWidth size="xs">Add</Button>
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
                        {barangaysData.length > 0 ? barangaysData.map((barangay) =>
                            <TableData key={barangay.id} barangays={barangay} />
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