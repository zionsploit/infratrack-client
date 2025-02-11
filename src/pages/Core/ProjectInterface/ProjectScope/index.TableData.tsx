import { Controller, useForm } from "react-hook-form";
import { ProjectScope, ReturnProjectScope } from "../../../../ServerTypes/ProjectInterface";
import { yupResolver } from "@hookform/resolvers/yup";
import { psSchema } from ".";
import { Button, Flex, Loader, Popover, rem, Stack, Table, Text, TextInput } from "@mantine/core";
import useUpdateProjectScope from "../../../../fetchHooks/mutation/projectInterface/useUpdateProjectScope";

export const TableData = (props: { ps: ReturnProjectScope }) => {
    const { ps } = props
    const { handleSubmit, control, formState: { errors } } = useForm<ProjectScope>({
        defaultValues: {
            ps_title: ps.ps_title
        },
        resolver: yupResolver(psSchema)
    })

    const mutationUpdateProjectScopeById = useUpdateProjectScope()

    const OnSubmitData = async (data: ProjectScope) => {
        await mutationUpdateProjectScopeById.mutateAsync({
            id: ps.id,
            ps_title: data.ps_title
        })
    }

    return <>
        <Table.Tr>
            <Table.Td>
                <Flex justify="space-between" align="center">
                    <Text>
                        {ps.ps_title}
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
                                        name="ps_title"
                                        render={({field}) => <TextInput
                                            label="Name"
                                            placeholder="Input New SOF"
                                            size="xs"
                                            error={errors.ps_title?.message}
                                            {...field}
                                        />}
                                    />
                                    <Button leftSection={mutationUpdateProjectScopeById.isPending ? <Loader size="xs" /> : null} disabled={mutationUpdateProjectScopeById.isPending} type="submit" fullWidth size="xs">Update</Button>
                                </Stack>
                            </form>
                        </Popover.Dropdown>
                    </Popover>
                </Flex>
            </Table.Td>
        </Table.Tr>
    </>
}