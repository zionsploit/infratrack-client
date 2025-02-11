import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import { ReturnSustainableDevelopmentGoals, SustainableDevelopmentGoals } from "../../../../ServerTypes/ProjectInterface";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sdgSchema } from ".";
import useUpdateSdg from "../../../../fetchHooks/mutation/projectInterface/useUpdateSdg";

export const TableData = (props: { sdg: ReturnSustainableDevelopmentGoals }) => {
    const { sdg } = props
    const { handleSubmit, control, formState: { errors } } = useForm<SustainableDevelopmentGoals>({
        defaultValues: {
            sdg_title: sdg.sdg_title
        },
        resolver: yupResolver(sdgSchema)
    })

    const mutationUpdateSdgById = useUpdateSdg()

    const OnSubmitData = async (data: SustainableDevelopmentGoals) => {
        await mutationUpdateSdgById.mutateAsync({
            id: sdg.id,
            sdg_title: data.sdg_title
        })
    }
    
    return <>
    <Table.Tr>
        <Table.Td>
            <Flex justify="space-between" align="center">
                <Text>
                    {sdg.sdg_title}
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
                                    name="sdg_title"
                                    render={({field}) => <TextInput
                                        label="Name"
                                        placeholder="Input New SDG"
                                        size="xs"
                                        error={errors.sdg_title?.message}
                                        {...field}
                                    />}
                                />
                                <Button leftSection={mutationUpdateSdgById.isPending ? <Loader size="xs" /> : null } disabled={mutationUpdateSdgById.isPending} type="submit" fullWidth size="xs">Update</Button>
                            </Stack>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Flex>
        </Table.Td>
    </Table.Tr>
    </>
}