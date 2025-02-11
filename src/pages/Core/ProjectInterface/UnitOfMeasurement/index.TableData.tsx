import { Controller, useForm } from "react-hook-form";
import { ReturnUnitOfMeasurements, UnitOfMeasurements } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { umSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateUm from "../../../../fetchHooks/mutation/projectInterface/useUpdateUm";

export const TableData = (props: { um: ReturnUnitOfMeasurements }) => {
    const { um } = props
    const { handleSubmit, control, formState: { errors } } = useForm<UnitOfMeasurements>({
        defaultValues: {
            um_title: um.um_title
        },
        resolver: yupResolver(umSchema)
    })

    const mutationUpdateUmById = useUpdateUm()

    const OnSubmitData = async (data: UnitOfMeasurements) => {
        await mutationUpdateUmById.mutateAsync({
            id: um.id,
            um_title: data.um_title
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {um.um_title}
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
                                        name="um_title"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.um_title?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateUmById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateUmById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}