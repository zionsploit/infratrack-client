import { Controller, useForm } from "react-hook-form";
import { Incharge, ReturnIncharge } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { inchargeSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateIncharge from "../../../../fetchHooks/mutation/projectInterface/useUpdateIncharge";

export const TableData = (props: { incharge: ReturnIncharge }) => {
    const { incharge } = props
    const { handleSubmit, control, formState: { errors }  } = useForm<Incharge>({
        defaultValues: {
            incharge: incharge.incharge
        },
        resolver: yupResolver(inchargeSchema)
    })

    const mutationUpdateInchargeById = useUpdateIncharge()

    const OnSubmitData = async (data: Incharge) => {
        await mutationUpdateInchargeById.mutateAsync({
            id: incharge.id,
            incharge: data.incharge
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {incharge.incharge}
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
                                        name="incharge"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.incharge?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateInchargeById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateInchargeById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}