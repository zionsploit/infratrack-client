import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import type { ReturnSectors, Sectors as SType } from "../../../../ServerTypes/ProjectInterface"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import useAddSector from "../../../../fetchHooks/mutation/projectInterface/useAddSector"
import useGetAllSector from "../../../../fetchHooks/query/projectInterface/useGetAllSector"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const sectorsSchema = yup.object({
    sectors: yup.string().required("Sector name is required")
})

export default () => {
    const [sectorData, setSectorData] = useState<Array<ReturnSectors>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<SType>({
        defaultValues: {
            sectors: ''
        },
        resolver: yupResolver(sectorsSchema)
    })

    // QUERY
    const getAllSector = useGetAllSector()
    // MUTATION
    const mutationAddSector = useAddSector()

    useEffect(() => {
        if (getAllSector.data) {
            setSectorData(getAllSector.data)
        }
    }, [getAllSector.data])

    const OnSubmitData = async (data: SType) => {
        await mutationAddSector.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Sectors</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create Sector">
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
                            <Stack>
                                <Controller 
                                    control={control}
                                    name="sectors"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new sector"
                                        size="xs"
                                        error={errors.sectors?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddSector.isPending ? <Loader size="xs" /> : null} disabled={mutationAddSector.isPending} type="submit" fullWidth size="xs">Add</Button>
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
                        {sectorData.length > 0 ? sectorData.map((sector) =>
                            <TableData key={sector.id} sectors={sector} />
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