import { Controller, useForm } from "react-hook-form";
import { Barangays, ReturnBarangays } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { barangaysSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateBarangays from "../../../../fetchHooks/mutation/projectInterface/useUpdateBarangays";

export const TableData = (props: { barangays: ReturnBarangays }) => {
    const { barangays } = props
    const { handleSubmit, control, formState: { errors } } = useForm<Barangays>({
        defaultValues: {
            barangays: barangays.barangays
        },
        resolver: yupResolver(barangaysSchema)
    })

    const mutationUpdateBarangaysById = useUpdateBarangays()

    const OnSubmitData = async (data: Barangays) => {
        await mutationUpdateBarangaysById.mutateAsync({
            id: barangays.id,
            barangays: data.barangays
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {barangays.barangays}
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
                                        name="barangays"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.barangays?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateBarangaysById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateBarangaysById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}