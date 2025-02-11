import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import { ReturnSourceOfFunds, SourceOfFunds } from "../../../../ServerTypes/ProjectInterface";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sofSchema } from ".";
import useUpdateSof from "../../../../fetchHooks/mutation/projectInterface/useUpdateSof";

export const TableData = (props: { sof: ReturnSourceOfFunds }) => {
    const { sof } = props
    const { handleSubmit, control, formState: { errors } } = useForm<SourceOfFunds>({
        defaultValues: {
            sof_title: sof.sof_title
        },
        resolver: yupResolver(sofSchema)
    })

    const mutationUpdateSofById = useUpdateSof()

    const OnSubmitData = async (data: SourceOfFunds) => {
        await mutationUpdateSofById.mutateAsync({
            id: sof.id,
            sof_title: data.sof_title
        })
    }
    
    return <>
    <Table.Tr>
        <Table.Td>
            <Flex justify="space-between" align="center">
                <Text>
                    {sof.sof_title}
                </Text>
                <Popover width={rem("400px")} trapFocus position="bottom" withArrow shadow="md">
                    <Popover.Target>
                        <Button variant="transparent" size="xs" tt="uppercase">Update</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={handleSubmit(OnSubmitData)}>
                            <Stack gap="xs">
                                <Controller 
                                    control={control}
                                    name="sof_title"
                                    render={({field}) => <TextInput
                                        label="Name"
                                        placeholder="Input New SOF"
                                        size="xs"
                                        error={errors.sof_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationUpdateSofById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateSofById.isPending} type="submit" fullWidth size="xs">Update</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
        </Table.Td>
    </Table.Tr>
    </>
}