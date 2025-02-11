import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { ReturnSustainableDevelopmentGoals, SustainableDevelopmentGoals as SDGType } from "../../../../ServerTypes/ProjectInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import { useEffect, useState } from "react"
import useGetAllSdg from "../../../../fetchHooks/query/projectInterface/useGetAllSdg"
import useAddSdg from "../../../../fetchHooks/mutation/projectInterface/useAddSdg"
import { TableData } from "./index.TableData"

export const sdgSchema = yup.object({
    sdg_title: yup.string().required("SDG Name is required")
})

export default () => {
    const [sdgData, setSdgData] = useState<Array<ReturnSustainableDevelopmentGoals>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<SDGType>({
        defaultValues: {
            sdg_title: ''
        },
        resolver: yupResolver(sdgSchema)
    })

    // QUERY
    const getAllSdg = useGetAllSdg()
    // MUTATION
    const mutationAddSdg = useAddSdg()


    useEffect(() => {
        if (getAllSdg.data) {
            setSdgData(getAllSdg.data)
        }
    }, [getAllSdg.data])


    const OnSubmitData = async (data: SDGType) => {
        await mutationAddSdg.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Sustainable Development Goals</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create SDG">
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
                                    name="sdg_title"
                                    render={({field}) => <TextInput
                                        label="Name"
                                        placeholder="Input New SDG"
                                        size="xs"
                                        error={errors.sdg_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddSdg.isPending ? <Loader size="xs" /> : null} disabled={mutationAddSdg.isPending} type="submit" fullWidth size="xs">Add</Button>
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
                        {sdgData ? sdgData.map((sdg) =>
                            <TableData key={sdg.id} sdg={sdg} />
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