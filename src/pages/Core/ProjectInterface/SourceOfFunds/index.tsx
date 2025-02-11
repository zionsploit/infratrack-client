import { ActionIcon, Button, Flex, Loader, Paper, Popover, rem, Stack, Table, Text, TextInput, ThemeIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { Controller, useForm } from "react-hook-form"
import * as yup from 'yup'
import { ReturnSourceOfFunds, SourceOfFunds as SOFType } from "../../../../ServerTypes/ProjectInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import useAddSof from "../../../../fetchHooks/mutation/projectInterface/useAddSof"
import useGetAllSof from "../../../../fetchHooks/query/projectInterface/useGetAllSof"
import { useEffect, useState } from "react"
import { TableData } from "./index.TableData"

export const sofSchema = yup.object({
    sof_title: yup.string().required("SOF Name is required")
})

export default () => {
    const [sofData, setSofData] = useState<Array<ReturnSourceOfFunds>>([])
    const { handleSubmit, control, formState: { errors } } = useForm<SOFType>({
        defaultValues: {
            sof_title: ''
        },
        resolver: yupResolver(sofSchema)
    })

    // QUERY
    const getAllSof = useGetAllSof()
    // MUTATION
    const mutationAddSof = useAddSof()

    useEffect(() => {
        if (getAllSof.data) {
            setSofData(getAllSof.data)
        }
    }, [getAllSof.data])

    const OnSubmitData = async (data: SOFType) => {
        await mutationAddSof.mutateAsync(data)
    }

    return <>
        <Paper miw={rem(420)}>
            <Flex my="xs" align="center" justify="space-between">
                <Text size="md" fw="bold" c="#14213d">Source of Funds</Text>
                <Popover width={rem("400px")} trapFocus position="bottom" shadow="md">
                    <Popover.Target>
                        <Tooltip label="Create SOF">
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
                                    name="sof_title"
                                    render={({field}) => <TextInput 
                                        label="Name"
                                        placeholder="Input new SOF"
                                        size="xs"
                                        error={errors.sof_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationAddSof.isPending ? <Loader size="xs" /> : null} disabled={mutationAddSof.isPending} type="submit" fullWidth size="xs">Add</Button>
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
                        {sofData.length > 0 ? sofData.map((sof) =>
                            <TableData key={sof.id} sof={sof} />
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